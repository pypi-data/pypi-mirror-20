from pydmrs.core import Dmrs


def dmrs_exact_matching(sub_dmrs, dmrs, equalities=(), match_top_index=False):
    """
    Performs an exact DMRS (sub)graph matching of a (sub)graph against a containing graph.
    :param sub_dmrs DMRS (sub)graph to match.
    :param dmrs DMRS graph to match against.
    :return Iterator of dictionaries, mapping node ids of the matched (sub)graph to the corresponding matching node id in the containing graph.
    """

    if not isinstance(sub_dmrs, Dmrs) or not isinstance(dmrs, Dmrs) or len(sub_dmrs) > len(dmrs):
        return iter(())
    matching = {}
    matching_values = set()
    matches = {}

    # find matchable nodes and add unambiguous matchings
    for sub_node in sub_dmrs.iter_nodes():
        match = [node.nodeid for node in dmrs.iter_nodes() if sub_node == node or sub_node.is_less_specific(node)]
        if match:
            if len(match) == 1:
                matching[sub_node.nodeid] = match[0]
                matching_values.add(match[0])
                continue
            matches[sub_node.nodeid] = match
        else:
            return iter(())

    # match index and top
    if match_top_index and sub_dmrs.index is not None:
        if dmrs.index is None:
            return iter(())
        sub_index = sub_dmrs.index.nodeid
        index = dmrs.index.nodeid
        if sub_index in matching:
            if matching[sub_index] != index:
                return iter(())
        else:
            if index in matches[sub_index]:
                matching[sub_index] = index
                matching_values.add(index)
                del matches[sub_index]
            else:
                return iter(())
    if match_top_index and sub_dmrs.top is not None:
        if dmrs.top is None:
            return iter(())
        sub_top = sub_dmrs.top.nodeid
        top = dmrs.top.nodeid
        if sub_top in matching:
            if matching[sub_top] != top:
                return iter(())
        else:
            if top in matches[sub_top]:
                matching[sub_top] = top
                matching_values.add(top)
                del matches[sub_top]
            else:
                return iter(())

    # optimisation for nodes with uniquely matching neighbour nodes
    for sub_nodeid, match in list(matches.items()):
        neighbours = []
        for n in sub_dmrs.get_neighbours(sub_nodeid, nodeids=True):
            if n not in matching:
                break
            neighbours.append(matching[n])
        else:  # all neighbours in sub_dmrs match uniquely
            candidate = None
            for nodeid in match:
                if nodeid is None:  # not possible if an optional node is present
                    candidate = None
                    break
                if nodeid in matching_values or any(n not in dmrs.get_neighbours(nodeid, nodeids=True) for n in neighbours):  # node is already assigned or has invalid neighbourhood
                    continue
                if candidate is not None:  # can't optimise in case of more than one candidate
                    break
                candidate = nodeid
            else:  # loop finished (no break), i.e. candidate is unique or non-existent
                if candidate is not None:
                    matching[sub_nodeid] = candidate
                    matching_values.add(candidate)
                    del matches[sub_nodeid]

    matches_items = list(matches.items())

    # does an exhaustive search over all the left-over matches in matches_items
    def _exhaustive_search(n):
        if not n:
            if _check_links():
                yield matching.copy()
            return
        n -= 1
        sub_nodeid, match = matches_items[n]
        for nodeid in match:  # assign and recursively continue for every possible match
            if nodeid is None or nodeid in matching_values:
                continue
            matching[sub_nodeid] = nodeid
            matching_values.add(nodeid)
            for result in _exhaustive_search(n):
                yield result
            matching_values.remove(nodeid)
        matching.pop(sub_nodeid, None)
        if None in match:  # without assigning if optional node is present
            for result in _exhaustive_search(n):
                yield result

    # checks whether the links match within the current node matching
    def _check_links():
        count = 0
        for l1 in dmrs.iter_links():
            if l1.start not in matching_values or l1.end not in matching_values:
                continue
            for l2 in sub_dmrs.iter_links():
                if (l2.rargname == '?' or l2.rargname == l1.rargname or (l1.rargname and l2.rargname == l1.rargname[:3] == 'ARG')) and (l2.post == '?' or l2.post == l1.post) and matching[l2.start] == l1.start and matching[l2.end] == l1.end:
                    count += 1
                    break
                # reversed directionality for None/EQ links which (so far) are undirected
                if l1.rargname is l2.rargname is None and l1.post == l2.post == 'EQ' and matching[l2.start] == l1.end and matching[l2.end] == l1.start:
                    count += 1
                    break
            else:
                return False
        return count == sub_dmrs.count_links()

    if isinstance(equalities, dict):
        equalities = tuple(equalities.values())
    for result in _exhaustive_search(len(matches_items)):
        if all(retriever(result, dmrs) == equality[0](result, dmrs) for equality in equalities for retriever in equality):
            yield result
