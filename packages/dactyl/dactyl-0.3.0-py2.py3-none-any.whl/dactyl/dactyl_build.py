#!/usr/bin/env python3

################################################################################
# Dactyl - a tool for heroic epics of documentation
#
# Generates a website from Markdown and Jinja templates, with filtering
# along the way.
################################################################################

DEFAULT_CONFIG_FILE = "dactyl-config.yml"

import os
import re
import yaml
import argparse
import logging
import traceback

# Necessary to copy static files to the output dir
from distutils.dir_util import copy_tree, remove_tree
from shutil import copy as copy_file

# Used for pulling in the default config file
from pkg_resources import resource_stream

# Used to import filters.
from importlib import import_module

# Necessary for prince
import subprocess

# Used to fetch markdown sources from GitHub repos
import requests

# Various content and template processing stuff
import jinja2
from markdown import markdown
from bs4 import BeautifulSoup

# Watchdog stuff
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

from dactyl.version import __version__

# The log level is configurable at runtime (see __main__ below)
logger = logging.getLogger(__name__)
logger.addHandler(logging.StreamHandler())

# These fields are special, and pages don't inherit them directly
RESERVED_KEYS_TARGET = [
    "name",
    "display_name",
    "filters",
    "image_subs",
    "image_re_subs",
    "pages",
]
ADHOC_TARGET = "__ADHOC__"
DEFAULT_PDF_FILE = "__DEFAULT_FILENAME__"
NO_PDF = "__NO_PDF__"

config = yaml.load(resource_stream(__name__, "default-config.yml"))


filters = {}
def load_config(config_file=DEFAULT_CONFIG_FILE):
    """Reload config from a YAML file."""
    global config, filters
    logger.debug("loading config file %s..." % config_file)
    try:
        with open(config_file, "r") as f:
            loaded_config = yaml.load(f)
    except FileNotFoundError as e:
        if config_file == DEFAULT_CONFIG_FILE:
            logger.warning("Couldn't read a config file; using generic config")
            loaded_config = {}
        else:
            traceback.print_tb(e.__traceback__)
            exit("Fatal: Config file '%s' not found"%config_file)
    except yaml.parser.ParserError as e:
        traceback.print_tb(e.__traceback__)
        exit("Fatal: Error parsing config file: %s"%e)

    config.update(loaded_config)

    # Warn if any pages aren't part of a target
    for page in config["pages"]:
        if "targets" not in page:
            if "name" in page:
                logger.warning("Page %s is not part of any targets." %
                             page["name"])
            else:
                logger.warning("Page %s is not part of any targets." % page)
        if "md" in page and "name" not in page:
            logger.debug("Guessing page name for page %s" % page)
            page_path = os.path.join(config["content_path"], page["md"])
            page["name"] = guess_title_from_md_file(page_path)

    # Figure out which filters we need and import them
    filternames = set(config["default_filters"])
    for target in config["targets"]:
        if "filters" in target:
            filternames.update(target["filters"])
    for page in config["pages"]:
        if "filters" in page:
            filternames.update(page["filters"])
    for filter_name in filternames:
        filters[filter_name] = import_module("dactyl.filter_"+filter_name)


def default_pdf_name(target):
    target = get_target(target)
    filename_segments = []
    for fieldname in config["pdf_filename_fields"]:
        if fieldname in target.keys():
            filename_segments.append(slugify(target[fieldname]))

    if filename_segments:
        return config["pdf_filename_separator"].join(filename_segments) + ".pdf"
    else:
        return slugify(target["name"])+".pdf"


# old default_pdf_name(target)
    # if {"product","version","guide"} <= set(target.keys()):
    #     p_name = slugify(target["product"])
    #     v_num = slugify(target["version"])
    #     g_name = slugify(target["guide"])
    #     return p_name+"-"+v_num+"-"+g_name+".pdf"
    # elif "display_name" in target:
    #     return slugify(target["display_name"])+".pdf"
    # else:
    #     return slugify(target["name"])+".pdf"

# Note: this regex means non-ascii characters get stripped from filenames,
#  which is not preferable when making non-English filenames.
unacceptable_chars = re.compile(r"[^A-Za-z0-9._ ]+")
whitespace_regex = re.compile(r"\s+")
def slugify(s):
    s = re.sub(unacceptable_chars, "", s)
    s = re.sub(whitespace_regex, "_", s)
    if not s:
        s = "_"
    return s

# Generate a unique nonce per-run to be used for tempdir folder names
nonce = str(time.time()).replace(".","")
def temp_dir():
    run_dir = os.path.join(config["temporary_files_path"],
                      "dactyl-"+nonce)
    if not os.path.isdir(run_dir):
        os.makedirs(run_dir)
    return run_dir

def substitute_links_for_target(soup, target):
    """Replaces local-html-links with appropriate substitutions
       for the given target, and images likewise"""
    target = get_target(target)

    logger.info("... modifying links for target: %s" % target["name"])
    # We actually want to get all pages, even the ones that aren't built as
    # part of this target, in case those pages have replacement links.
    pages = get_pages()

    links = soup.find_all("a", href=re.compile(r"^[^.]+\.html"))
    for link in links:
        for page in pages:
            if target["name"] in page:
                #There's a replacement link for this env
                local_url = page["html"]
                target_url = page[target["name"]]
                if link["href"][:len(local_url)] == local_url:
                    link["href"] = link["href"].replace(local_url,
                                                        target_url)

    if "image_subs" in target:
        images = soup.find_all("img")
        for img in images:
            local_path = img["src"]
            if local_path in target["image_subs"]:
                logger.info("... replacing image path '%s' with '%s'" %
                            (local_path, target["image_subs"][local_path]))
                img["src"] = target["image_subs"][local_path]

        image_links = soup.find_all("a",
                href=re.compile(r"^[^.]+\.(png|jpg|jpeg|gif|svg)"))
        for img_link in image_links:
            local_path = img_link["href"]
            if local_path in target["image_subs"]:
                logger.info("... replacing image link '%s' with '%s'" %
                            (local_path, target["image_subs"][local_path]))
                img_link["href"] = target["image_subs"][local_path]

    if "image_re_subs" in target:
        images = soup.find_all("img")
        for img in images:
            local_path = img["src"]
            for regex,replace_pattern in target["image_re_subs"].items():
                m = re.match(regex, local_path)
                if m:
                    logging.debug("... matched pattern '%s' for image src '%s'" %
                            (m, local_path))
                    new_path = re.sub(regex, replace_pattern, local_path)
                    logging.debug("... ... replacing with '%s'" % new_path)
                    img["src"] = new_path

        image_links = soup.find_all("a",
                href=re.compile(r"^[^.]+\.(png|jpg|jpeg|gif|svg)"))
        for img_link in image_links:
            local_path = img_link["href"]
            for regex,replace_pattern in target["image_re_subs"].items():
                m = re.match(regex, local_path)
                if m:
                    logging.debug("... matched pattern '%s' for image link '%s'" %
                            (m, local_path))
                    new_path = re.sub(regex, replace_pattern, local_path)
                    logging.debug("... ... replacing with '%s'" % new_path)
                    img_link["href"] = new_path

def substitute_parameter_links(link_parameter, currentpage, target):
    """Some templates have links in page parameters. Do link substitution for
       the target on one of those parameters."""
    target = get_target(target)
    # We actually want to get all pages, even the ones that aren't built as
    # part of this target, in case those pages have replacement links.
    pages = get_pages()

    if link_parameter in currentpage:
        linked_page = next(p for p in pages
            if p["html"] == currentpage[link_parameter])
        if target["name"] in linked_page:
            #there's a link substitution available
            currentpage[link_parameter] = linked_page[target["name"]]
        ## We could warn here, but it would frequently be a false alarm
        # else:
        #     logger.warning("No substitution for %s[%s] for this target" %
        #                     (currentpage["html"],link_parameter))

def get_target(target):
    """Get a target by name, or return the default target object.
       We can't use default args in function defs because the default is
       set at runtime based on config"""
    if target == None:
        logger.debug("get_target: using target #0")
        if len(config["targets"]) == 0:
            exit("No targets found. Either specify a config file or --pages")
        return config["targets"][0]

    if type(target) == str:
        try:
            return next(t for t in config["targets"] if t["name"] == target)
        except StopIteration:
            logger.critical("Unknown target: %s" % target)
            exit(1)

    if "name" in target:
        # Eh, it's probably a target, just return it
        return target


def make_adhoc_target(inpages):
    t = {
        "name": ADHOC_TARGET,
        "display_name": "(Untitled)",
    }

    if len(inpages) == 1:
        t["display_name"] = guess_title_from_md_file(inpages[0])

    for inpage in inpages:
        # Figure out the actual filename and location of this infile
        # and set the content source dir appropriately
        in_dir, in_file = os.path.split(inpage)
        config["content_path"] = in_dir

        # Figure out what html file to output to
        ENDS_IN_MD = re.compile("\.md$", re.I)
        if re.search(ENDS_IN_MD, in_file):
            out_html_file = re.sub(ENDS_IN_MD, ".html", in_file)
        else:
            out_html_file = in_file+".html"

        # Try to come up with a reasonable page title
        page_title = guess_title_from_md_file(inpage)

        new_page = {
            "name": page_title,
            "md": in_file,
            "html": out_html_file,
            "targets": [ADHOC_TARGET],
            "category": "Pages",
            "pp_env": in_dir,
        }
        config["pages"].append(new_page)

    config["targets"].append(t)

    return t


def guess_title_from_md_file(filepath):
    with open(filepath, "r") as f:
        line1 = f.readline()
        line2 = f.readline()

        # look for headers in the "followed by ----- or ===== format"
        ALT_HEADER_REGEX = re.compile("^[=-]{3,}$")
        if ALT_HEADER_REGEX.match(line2):
            possible_header = line1
            if possible_header.strip():
                return possible_header.strip()

        # look for headers in the "## abc ## format"
        HEADER_REGEX = re.compile("^#+\s*(.+[^#\s])\s*#*$")
        m = HEADER_REGEX.match(line1)
        if m:
            possible_header = m.group(1)
            if possible_header.strip():
                return possible_header.strip()

    #basically if the first line's not a markdown header, we give up and use
    # the filename instead
    return os.path.basename(filepath)


def get_filters_for_page(page, target=None):
    ffp = set(config["default_filters"])
    target = get_target(target)
    if "filters" in target:
        ffp.update(target["filters"])
    if "filters" in page:
        ffp.update(page["filters"])
    return ffp


def parse_markdown(page, target=None, pages=None, bypass_errors=False):
    """Take a markdown string and output HTML for that content"""
    target = get_target(target)

    # if "pages" not in target:
    #     target["pages"] = get_pages(target)

    logger.info("Preparing page %s" % page["name"])

    # Preprocess Markdown using this Jinja environment
    pp_env = setup_pp_env(page)

    # We'll apply these filters to the page
    page_filters = get_filters_for_page(page, target)

    md = get_markdown_for_page(page["md"], pp_env=pp_env, target=target,
                            bypass_errors=bypass_errors, currentpage=page)

    # Apply markdown-based filters here
    for filter_name in page_filters:
        if "filter_markdown" in dir(filters[filter_name]):
            logger.info("... applying markdown filter %s" % filter_name)
            md = filters[filter_name].filter_markdown(md, target=target,
                            page=page, config=config)

    # Actually parse the markdown
    logger.info("... parsing markdown...")
    html = markdown(md, extensions=["markdown.extensions.extra",
                                    "markdown.extensions.toc"],
                    lazy_ol=False)

    # Apply raw-HTML-string-based filters here
    for filter_name in page_filters:
        if "filter_html" in dir(filters[filter_name]):
            logger.info("... applying HTML filter %s" % filter_name)
            html = filters[filter_name].filter_html(html, target=target,
                            page=page, config=config)

    # Some filters would rather operate on a soup than a string.
    # May as well parse once and re-serialize once.
    soup = BeautifulSoup(html, "html.parser")

    # Apply soup-based filters here
    for filter_name in page_filters:
        if "filter_soup" in dir(filters[filter_name]):
            logger.info("... applying soup filter %s" % filter_name)
            filters[filter_name].filter_soup(soup, target=target,
                            page=page, config=config)
            # ^ the soup filters apply to the same object, passed by reference

    # Replace links and images based on the target
    substitute_links_for_target(soup, target)

    logger.info("... re-rendering HTML from soup...")
    html2 = str(soup)
    return html2


def githubify_markdown(md, target=None, pages=None):
    """Github-friendly markdown has absolute links, no md in divs"""
    MARKDOWN_LINK_REGEX = re.compile(
        r"(\[([^\]]+)\]\(([^:)]+)\)|\[([^\]]+)\]:\s*(\S+)$)", re.MULTILINE)

    target = get_target(target)
    if not pages:
        pages = get_pages(target["name"])

    class MDLink:
        """A markdown link, either a reference link or inline link"""
        def __init__(self, fullmatch, label, url, label2, url2):
            self.fullmatch = fullmatch
            if label:
                self.label = label
                self.url = url
                self.is_reflink = False
            elif label2:
                self.label = label2
                self.url = url2
                self.is_reflink = True

        def to_markdown(self):
            """Re-represent self as a link in markdown syntax"""
            s = "[" + self.label + "]"
            if self.is_reflink:
                s += ": " + self.url
            else:
                s += "(" + self.url + ")"
            return s

    links = [MDLink(*m) for m in MARKDOWN_LINK_REGEX.findall(md)]

    for link in links:
        for page in pages:
            if target["name"] in page:
                #There's a replacement link for this
                local_url = page["html"]
                target_url = page[target["name"]]
                if link.url[:len(local_url)] == local_url:
                    link.url = link.url.replace(local_url, target_url)
                    md = md.replace(link.fullmatch, link.to_markdown())

    return md


def get_pages(target=None):
    """Read pages from config and return an object, optionally filtered
       to just the pages that this target cares about"""

    target = get_target(target)
    pages = config["pages"]

    if target["name"]:
        #filter pages that aren't part of this target
        def should_include(page, target_name):
            if "targets" not in page:
                return False
            if target_name in page["targets"]:
                return True
            else:
                return False
        pages = [page for page in pages
                 if should_include(page, target["name"])]

    # Pages should inherit non-reserved keys from the target
    for p in pages:
        for key,val in target.items():
            if key in RESERVED_KEYS_TARGET:
                continue
            elif key not in p:
                p[key] = val
    return pages


def get_categories(pages):
    """Produce an ordered, de-duplicated list of categories from
       the page list"""
    categories = []
    for page in pages:
        if "category" in page and page["category"] not in categories:
            categories.append(page["category"])
    logger.debug("categories: %s" % categories)
    return categories


def read_markdown_local(filename, pp_env, target=None, bypass_errors=False, currentpage={}):
    """Read in a markdown file and pre-process any templating lang in it,
       returning the parsed contents."""
    target = get_target(target)
    pages = get_pages(target)
    logger.info("reading markdown from file: %s" % filename)

    if config["skip_preprocessor"]:
        fpath = pp_env.loader.searchpath[0]
        with open(os.path.join(fpath,filename), "r") as f:
            md_out = f.read()
    else:
        try:
            md_raw = pp_env.get_template(filename)
            md_out = md_raw.render(target=target, pages=pages, currentpage=currentpage)
        except jinja2.TemplateError as e:
            traceback.print_tb(e.__traceback__)
            if bypass_errors:
                logger.warning("Error pre-processing page %s; trying to load it raw"
                             % filename)
                fpath = pp_env.loader.searchpath[0]
                with open(os.path.join(fpath,filename), "r") as f:
                    md_out = f.read()
            else:
                exit("Error pre-processing page %s: %s" % (filename, e))
    return md_out


def read_markdown_remote(url):
    """Fetch a remote markdown file and return its contents"""
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise requests.RequestException("Status code for page was not 200")


def get_markdown_for_page(md_where, pp_env=None, target=None, bypass_errors=False, currentpage={}):
    """Read/Fetch and pre-process markdown file"""
    target = get_target(target)
    if "http:" in md_where or "https:" in md_where:
        try:
            mdr = read_markdown_remote(md_where)
        except requests.RequestException as e:
            if bypass_errors:
                mdr = ""
            else:
                traceback.print_tb(e.__traceback__)
                exit("Error fetching page %s: %s" % (md_where, e))
        return mdr
    else:
        return read_markdown_local(md_where, pp_env, target, bypass_errors, currentpage=currentpage)


def copy_static_files(template_static=True, content_static=True, out_path=None):
    """Copy static files to the output directory."""
    if out_path == None:
        out_path = config["out_path"]


    if template_static:
        template_static_src = config["template_static_path"]

        if os.path.isdir(template_static_src):
            template_static_dst = os.path.join(out_path,
                                       os.path.basename(template_static_src))
            copy_tree(template_static_src, template_static_dst)
        else:
            logger.warning(("Template` static path '%s' doesn't exist; "+
                            "skipping.") % template_static_src)

    if content_static:
        if "content_static_path" in config:
            if type(config["content_static_path"]) == str:
                content_static_srcs = [config["content_static_path"]]
            else:
                content_static_srcs = config["content_static_path"]

            for content_static_src in content_static_srcs:
                if os.path.isdir(content_static_src):
                    content_static_dst = os.path.join(out_path,
                                        os.path.basename(content_static_src))
                    copy_tree(content_static_src, content_static_dst)
                elif os.path.isfile(content_static_src):
                    content_static_dst = os.path.join(out_path,
                                        os.path.dirname(content_static_src))
                    logger.debug("Copying single content_static_path file '%s'." %
                            content_static_src)
                    copy_file(content_static_src, content_static_dst)
                else:
                    logger.warning("Content static path '%s' doesn't exist; skipping." %
                                    content_static_src)
        else:
            logger.debug("No content_static_path in conf; skipping copy")


def setup_pp_env(page=None):
    if not page or "pp_dir" not in page:
        pp_env = jinja2.Environment(loader=jinja2.FileSystemLoader(config["content_path"]))
    else:
        pp_env = jinja2.Environment(loader=jinja2.FileSystemLoader(page["pp_dir"]))
    #Example: if we want to add custom functions to the md files
    #pp_env.globals['foo'] = lambda x: "FOO %s"%x
    return pp_env


def setup_html_env():
    if "template_path" in config:
        env = jinja2.Environment(loader=jinja2.FileSystemLoader(config["template_path"]))
    else:
        env = setup_fallback_env()
    env.lstrip_blocks = True
    env.trim_blocks = True
    return env

def setup_fallback_env():
    env = jinja2.Environment(loader=jinja2.PackageLoader(__name__))
    env.lstrip_blocks = True
    env.trim_blocks = True
    return env

def toc_from_headers(html_string):
    """make a table of contents from headers"""
    soup = BeautifulSoup(html_string, "html.parser")
    headers = soup.find_all(name=re.compile("h[1-3]"), id=True)
    toc_s = ""
    for h in headers:
        if h.name == "h1":
            toc_level = "level-1"
        elif h.name == "h2":
            toc_level = "level-2"
        else:
            toc_level = "level-3"

        new_a = soup.new_tag("a", href="#"+h["id"])
        if h.string:
            new_a.string = h.string
        else:
            new_a.string = " ".join(h.strings)
        new_li = soup.new_tag("li")
        new_li["class"] = toc_level
        new_li.append(new_a)

        toc_s += str(new_li)+"\n"

    return str(toc_s)


def render_pages(target=None, for_pdf=False, bypass_errors=False):
    """Parse and render all pages in target, writing files to out_path."""
    target = get_target(target)
    pages = get_pages(target)
    categories = get_categories(pages)

    # Insert generated HTML into templates using this Jinja environment
    env = setup_html_env()
    fallback_env = setup_fallback_env()

    if for_pdf:
        try:
            if "pdf_template" in target:
                logger.debug("reading pdf template %s from target..." % target["pdf_template"])
                default_template = env.get_template(target["pdf_template"])
            else:
                logger.debug("reading default pdf template %s..." % config["pdf_template"])
                default_template = env.get_template(config["pdf_template"])
        except jinja2.exceptions.TemplateNotFound:
            logger.warning("falling back to Dactyl built-in PDF template")
            default_template = fallback_env.get_template(config["pdf_template"])
    else:
        try:
            if "template" in target:
                logger.debug("reading HTML template %s from target..." % target["template"])
                default_template = env.get_template(target["template"])
            else:
                logger.debug("reading default HTML template %s..." % config["default_template"])
                default_template = env.get_template(config["default_template"])
        except jinja2.exceptions.TemplateNotFound:
            logger.warning("falling back to Dactyl built-in HTML template")
            default_template = fallback_env.get_template(config["default_template"])

    for currentpage in pages:
        if "md" in currentpage:
            # Read and parse the markdown

            try:
                html_content = parse_markdown(currentpage, target=target,
                                      pages=pages, bypass_errors=bypass_errors)

            except Exception as e:
                if bypass_errors:
                    traceback.print_tb(e.__traceback__)
                    logger.warning( ("Skipping page %s " +
                          "due to error fetching contents: %s") %
                           (currentpage["name"], e) )
                    continue
                else:
                    traceback.print_tb(e.__traceback__)
                    exit("Error when fetching page %s: %s" %
                         (currentpage["name"], e) )
        else:
            html_content = ""

        # default to a table-of-contents sidebar...
        if "sidebar" not in currentpage:
            currentpage["sidebar"] = "toc"
        if currentpage["sidebar"] == "toc":
            sidebar_content = toc_from_headers(html_content)
        else:
            sidebar_content = None

        # Prepare some parameters for rendering
        substitute_parameter_links("doc_page", currentpage, target)
        current_time = time.strftime("%B %d, %Y")

        # Figure out which template to use
        if "template" in currentpage and not for_pdf:
            logger.debug("using template %s from page" % currentpage["template"])
            use_template = env.get_template(currentpage["template"])
        elif "pdf_template" in currentpage and for_pdf:
            logger.debug("using pdf_template %s from page" % currentpage["pdf_template"])
            use_template = env.get_template(currentpage["pdf_template"])
        else:
            use_template = default_template

        # Render the content into the appropriate template
        out_html = use_template.render(currentpage=currentpage,
                                           categories=categories,
                                           pages=pages,
                                           content=html_content,
                                           target=target,
                                           current_time=current_time,
                                           sidebar_content=sidebar_content)


        if for_pdf:
            #out_path = config["temporary_files_path"]
            out_path = temp_dir()
        else:
            out_path = config["out_path"]
        fileout = os.path.join(out_path, currentpage["html"])
        if not os.path.isdir(out_path):
            logger.info("creating build folder %s" % out_path)
            os.makedirs(out_path)
        with open(fileout, "w") as f:
            logger.info("writing to file: %s..." % fileout)
            f.write(out_html)


def watch(pdf_file, target):
    """Look for changed files and re-generate HTML (and optionally
       PDF whenever there's an update. Runs until interrupted."""
    target = get_target(target)

    class UpdaterHandler(PatternMatchingEventHandler):
        """Updates to pattern-matched files means rendering."""
        def on_any_event(self, event):
            logger.info("got event!")
            # bypass_errors=True because Watch shouldn't
            #  just die if a file is temporarily not found
            if pdf_file:
                make_pdf(pdf_file, target=target, bypass_errors=True)
            else:
                render_pages(target, bypass_errors=True)
            logger.info("done rendering")

    patterns = ["*template-*.html",
                "*.md",
                "*code_samples/*"]

    event_handler = UpdaterHandler(patterns=patterns)
    observer = Observer()
    observer.schedule(event_handler, config["template_path"], recursive=True)
    observer.schedule(event_handler, config["content_path"], recursive=True)
    observer.start()
    # The above starts an observing thread,
    #   so the main thread can just wait
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


def make_pdf(outfile, target=None, bypass_errors=False, remove_tmp=True):
    """Use prince to convert several HTML files into a PDF"""
    logger.info("rendering PDF-able versions of pages...")
    target = get_target(target)
    render_pages(target=target, for_pdf=True, bypass_errors=bypass_errors)

    temp_files_path = temp_dir()

    # Choose a reasonable default filename if one wasn't provided yet
    if outfile == DEFAULT_PDF_FILE:
        outfile = default_pdf_name(target)

    # Prince will need the static files, so copy them over
    copy_static_files(out_path=temp_files_path)

    # Make sure the path we're going to write the PDF to exists
    if not os.path.isdir(config["out_path"]):
        logger.info("creating output folder %s" % config["out_path"])
        os.makedirs(config["out_path"])
    abs_pdf_path = os.path.abspath(os.path.join(config["out_path"], outfile))

    # Start preparing the prince command
    args = [config["prince_executable"], '--javascript', '-o', abs_pdf_path]
    # Change dir to the tempfiles path; this may avoid a bug in Prince
    old_cwd = os.getcwd()
    os.chdir(temp_files_path)
    # Each HTML output file in the target is another arg to prince
    pages = get_pages(target)
    args += [p["html"] for p in pages]

    logger.info("generating PDF: running %s..." % " ".join(args))
    prince_resp = subprocess.check_output(args, universal_newlines=True)
    print(prince_resp)

    # Clean up the tempdir now that we're done using it
    os.chdir(old_cwd)
    if remove_tmp:
        remove_tree(temp_files_path)


def githubify(md_file_name, target=None):
    """Wrapper - make the markdown resemble GitHub flavor"""
    target = get_target(target)

    pages = get_pages()
    logger.info("getting markdown for page %s" % md_file_name)
    md = get_markdown_for_page(md_file_name,
                               pp_env=setup_pp_env(),
                               target=target)

    logger.info("githubifying markdown...")
    rendered_md = githubify_markdown(md, target=target, pages=pages)

    if not os.path.isdir(config["out_path"]):
        logger.info("creating build folder %s" % config["out_path"])
        os.makedirs(config["out_path"])

    fileout = os.path.join(config["out_path"], md_file_name)
    logger.info("writing generated file to path: %s"%fileout)
    with open(fileout, "w") as f:
        f.write(rendered_md)


def main(cli_args):
    if cli_args.debug:
        logger.setLevel(logging.DEBUG)
    elif not cli_args.quiet:
        logger.setLevel(logging.INFO)

    if cli_args.config:
        load_config(cli_args.config)
    else:
        load_config()

    if cli_args.version:
        print("Dactyl version %s" % __version__)
        exit(0)

    if cli_args.list_targets_only:
        for t in config["targets"]:
            if "display_name" in t:
                display_name = t["display_name"]
            elif {"product","version","guide"} <= set(t.keys()):
                display_name = " ".join([t["product"],t["version"],t["guide"]])
            else:
                display_name = ""
            print("%s\t\t%s" % (t["name"], display_name))

        #print(" ".join([t["name"] for t in config["targets"]]))
        exit(0)

    if cli_args.out_dir:
        config["out_path"] = cli_args.out_dir

    config["skip_preprocessor"] = cli_args.skip_preprocessor

    if cli_args.pages:
        make_adhoc_target(cli_args.pages)
        cli_args.target = ADHOC_TARGET

    target = get_target(cli_args.target)

    if cli_args.vars:
        try:
            if cli_args.vars[-5:] in (".json",".yaml"):
                with open(cli_args.vars, "r") as f:
                    custom_keys = yaml.load(f)
            else:
                custom_keys = yaml.load(cli_args.vars)
            for k,v in custom_keys.items():
                if k not in RESERVED_KEYS_TARGET:
                    logger.debug("setting var '%s'='%s'" %(k,v))
                    target[k] = v
                else:
                    raise KeyError("Vars can't include reserved key '%s'" % k)
        except Exception as e:
            traceback.print_tb(e.__traceback__)
            exit("FATAL: --vars value was improperly formatted: %s" % e)

    if cli_args.title:
        target["display_name"] = cli_args.title

    if cli_args.githubify:
        githubify(cli_args.githubify, target)
        if cli_args.copy_static:
            copy_static(template_static=False, content_static=True)
        exit(0)

    if not cli_args.no_cover and not target.get("no_cover", False):
        # Add the default cover as the first page of the target
        coverpage = config["cover_page"]
        coverpage["targets"] = [target["name"]]
        config["pages"].insert(0, coverpage)

    if cli_args.pdf != NO_PDF:
        logger.info("making a pdf...")
        make_pdf(cli_args.pdf, target=target,
                 bypass_errors=cli_args.bypass_errors,
                 remove_tmp=(not cli_args.leave_temp_files))
        logger.info("pdf done")

    else:
        logger.info("rendering pages...")
        render_pages(target=cli_args.target,
                     bypass_errors=cli_args.bypass_errors)
        logger.info("done rendering")

        if cli_args.copy_static:
            logger.info("copying static pages...")
            copy_static_files()

    if cli_args.watch:
        logger.info("watching for changes...")
        if cli_args.pdf != NO_PDF:
            # pdf_path = os.path.join(config["out_path"], cli_args.pdf)
            watch(cli_args.pdf, target)
        else:
            watch(None, target)


def dispatch_main():
    parser = argparse.ArgumentParser(
        description='Generate static site from markdown and templates.')
    parser.add_argument("--watch", "-w", action="store_true",
                        help="Watch for changes and re-generate output. "+\
                             "This runs until force-quit.")
    parser.add_argument("--pdf", nargs="?", type=str,
                        const=DEFAULT_PDF_FILE, default=NO_PDF,
                        help="Output a PDF to this file. Requires Prince.")
    parser.add_argument("--githubify", "-g", type=str,
                        help="Output md prepared for GitHub")
    parser.add_argument("--target", "-t", type=str,
                        help="Build for the specified target.")
    parser.add_argument("--out_dir", "-o", type=str,
                        help="Output to this folder (overrides config file)")
    parser.add_argument("--quiet", "-q", action="store_true",
                        help="Suppress status messages")
    parser.add_argument("--debug", action="store_true",
                        help="Print debug-level log messages (overrides -q)")
    parser.add_argument("--bypass_errors", "-b", action="store_true",
                        help="Continue building if some contents not found")
    parser.add_argument("--config", "-c", type=str,
                        help="Specify path to an alternate config file.")
    parser.add_argument("--copy_static", "-s", action="store_true",
                        help="Copy static files to the out dir",
                        default=False)
    parser.add_argument("--pages", type=str, help="Build markdown page(s) "+\
                        "that aren't described in the config.", nargs="+")
    parser.add_argument("--no_cover", "-n", action="store_true",
                        help="Don't automatically add a cover / index file.")
    parser.add_argument("--skip_preprocessor", action="store_true", default=False,
                        help="Don't pre-process Jinja syntax in markdown files")
    parser.add_argument("--title", type=str, help="Override target display "+\
                        "name. Useful when passing multiple args to --pages.")
    parser.add_argument("--list_targets_only", "-l", action="store_true",
                        help="Don't build anything, just display list of "+
                        "known targets from the config file.")
    parser.add_argument("--leave_temp_files", action="store_true",
                        help="Leave temp files in place (for debugging or "+
                        "manual PDF generation). Ignored when using --watch",
                        default=False)
    parser.add_argument("--vars", type=str, help="A YAML or JSON file with vars "+
                        "to add to the target so the preprocessor and "+
                        "templates can reference them.")
    parser.add_argument("--version", "-v", action="store_true",
                        help="Print version information and exit.")
    cli_args = parser.parse_args()
    main(cli_args)


if __name__ == "__main__":
    dispatch_main()
