# -*- coding: utf-8 -*-
import re
from anchorman.utils import check_tags
from anchorman.utils import check_classes
from anchorman.utils import log
from anchorman.utils import do_profile


def unit_slices(text, the_soup, settings):
    """Slices for all units.

    # from bs4.diagnose import diagnose
    # data = open("bad.html").read()
    # diagnose(data)

    :param text:
    :param config:
    """
    return (units_gen(the_soup, settings),
            proof_areas(the_soup, settings))


def units_gen(the_soup, settings):

    text_unit_key = settings['text_unit']['key']
    soup, soup_str = the_soup
    # for a_tag in soup.findAll(True):
    for a_tag in soup.findAll(text_unit_key):
        # if a_tag.name == text_unit_key:
        try:
            u_tag = a_tag.__unicode__()
            # # bs4 wrongly aumgmented string?!
            _from = soup_str.index(u_tag)
            yield (_from, _from + len(u_tag), u_tag)
        except ValueError as e:
            log("substring not found: {}, {}".format(u_tag, e))


# @do_profile(follow=[check_classes])
def proof_areas(the_soup, settings):
    """ """
    forbidden_areas = settings.get('forbidden_areas', {})

    soup, soup_str = the_soup
    tags = forbidden_areas.get('tags', [])
    classes = forbidden_areas.get('classes', [])

    forbiddens = []
    for a_tag in soup.findAll(True):
        # find forbidden tags
        u_tag = a_tag.__unicode__()
        forbidden_tag = check_tags(a_tag, u_tag, tags, soup_str)
        if forbidden_tag:
            forbiddens.append(forbidden_tag)
        # find forbidden elements by class
        for forbidden_element in check_classes(
                a_tag, u_tag, classes, soup_str):
            forbiddens.append(forbidden_element)

    if settings.get('no_links_inside_tags'):
        # find tag elements and mark the intervall
        forbiddens += [(match.start(), match.end(), None)
                       for match in re.finditer(r"<(\w|/).*?>", soup_str)]

    return forbiddens
