# -*- coding: utf-8 -*-
from anchorman import candidate
from anchorman.utils import sort_em
from anchorman.utils import saturated_unit
from anchorman.utils import log


def applicables(elements_per_units, old_links, config, own_validator):
    """Loop the units and validate each item in a unit.

    :param elements_per_units:
    :param config:
    :param own_validator:
    """
    rules = config['rules']
    replaces_at_all = rules.get('replaces_at_all')
    items_per_unit = rules.get('items_per_unit')
    sort_by_item_value = rules.get('sort_by_item_value')

    candidates = []
    candidates_append = candidates.append

    i = 0
    for (u_from, u_to, u_string), elements in elements_per_units:
        i += 1
        log("UNIT %s %s, %s, %s" %(i, u_from, u_to, u_string))

        if len(elements) is 0:
            continue

        # # check the rules - 1. replaces_at_all
        if replaces_at_all and len(candidates) >= replaces_at_all:
            return the_applicables(candidates, config)

        unit_candidates = []
        unit_candidates_append = unit_candidates.append
        args = items_per_unit, old_links, u_from, u_to, unit_candidates
        elements = sort_em(sort_by_item_value, elements, 3)

        log('\n'.join([str(x) for x in elements]))

        for _from, _to, token, element in elements:
            # # check the rules - 1. replaces_at_all
            if replaces_at_all and len(candidates) >= replaces_at_all:
                return the_applicables(candidates, config)

            # we need to check this already before first candidate
            if saturated_unit(*args):
                break

            if candidate.valid(((token, element), candidates, unit_candidates,
                               rules, old_links), own_validator):
                valid_candidate = (_from, _to, token, element)
                candidates_append(valid_candidate)
                unit_candidates_append(valid_candidate)
                # # 2. text_unit > number_of_items
                if saturated_unit(*args):
                    break

    return the_applicables(candidates, config)


def augment_result(text, to_be_applied):
    """Augment the text with the elements in to be applied.

    :param text:
    :param to_be_applied:
    """
    for _from, _to, _, anchor, _ in sorted(to_be_applied, reverse=True):
        # text = "{}{}{}".format(text[:_from], anchor, text[_to:])
        text = text[:_from] + anchor + text[_to:]
        # text2 = ''.join([text2[:_from], anchor, text2[_to:]])

    return text


def the_applicables(candidates, config):
    return candidates
    # return [create_element(c, config) for c in candidates]
