from __future__ import print_function

import itertools as itt
import logging
import sys
from operator import itemgetter

from .constants import *
from .parser.language import rev_abundance_labels, unqualified_edges
from .parser.modifiers import FusionParser
from .parser.modifiers.fragment import FragmentParser
from .parser.modifiers.protein_modification import PmodParser
from .parser.utils import ensure_quotes

__all__ = ['to_bel']

log = logging.getLogger(__name__)


# FIXME remove this, replace with edges_iter
def get_neighbors_by_path_type(g, v, relation):
    """Gets the set of neighbors of a given node that have a relation of the given type

    :param g: A BEL network
    :type g: :class:`pybel.BELGraph`
    :param v: a node from the BEL network
    :param relation: the relation to follow from the given node
    :return:
    """
    result = []
    for neighbor in g.edge[v]:
        for data in g.edge[v][neighbor].values():
            if data[RELATION] == relation:
                result.append(neighbor)
    return set(result)


def postpend_location(s, location_model):
    """Rips off the closing parentheses and adds canonicalized modification.

    I did this because writing a whole new parsing model for the data would be sad and difficult

    :param s:
    :type s: BEL string representing node
    :param location_model:
    :return:
    """

    if all(k in location_model for k in {NAMESPACE, NAME}):
        return "{}, loc({}:{}))".format(s[:-1], location_model[NAMESPACE], ensure_quotes(location_model[NAME]))
    raise ValueError('Location model missing namespace and/or name keys: {}'.format(location_model))


def decanonicalize_variant(tokens):
    if tokens[KIND] == PMOD:
        if tokens[IDENTIFIER][NAMESPACE] == BEL_DEFAULT_NAMESPACE:
            name = tokens[IDENTIFIER][NAME]
        else:
            name = '{}:{}'.format(tokens[IDENTIFIER][NAMESPACE], tokens[IDENTIFIER][NAME])
        return 'pmod({}{})'.format(name, ''.join(', {}'.format(tokens[x]) for x in PmodParser.ORDER[2:] if x in tokens))
    elif tokens[KIND] == GMOD:
        if tokens[IDENTIFIER][NAMESPACE] == BEL_DEFAULT_NAMESPACE:
            name = tokens[IDENTIFIER][NAME]
        else:
            name = '{}:{}'.format(tokens[IDENTIFIER][NAMESPACE], tokens[IDENTIFIER][NAME])
        return 'gmod({})'.format(name)
    elif tokens[KIND] == HGVS:
        return 'var({})'.format(tokens[IDENTIFIER])
    elif tokens[KIND] == FRAGMENT:
        if FragmentParser.MISSING in tokens:
            res = 'frag(?'
        else:
            res = 'frag({}_{}'.format(tokens[FragmentParser.START], tokens[FragmentParser.STOP])

        if FragmentParser.DESCRIPTION in tokens:
            res += ', {}'.format(tokens[FragmentParser.DESCRIPTION])

        return res + ')'


def decanonicalize_fusion_range(tokens):
    if FusionParser.REFERENCE in tokens:
        return '{}.{}_{}'.format(tokens[FusionParser.REFERENCE],
                                 tokens[FusionParser.START],
                                 tokens[FusionParser.STOP])
    return '?'


def decanonicalize_node(g, v):
    """Returns a node from a graph as a BEL string

    :param g: a BEL network
    :type g: :class:`pybel.BELGraph`
    :param v: a node from the BEL graph
    """
    data = g.node[v]

    if data[FUNCTION] == REACTION:
        reactants = get_neighbors_by_path_type(g, v, HAS_REACTANT)
        reactants_canon = map(lambda n: decanonicalize_node(g, n), sorted(reactants))
        products = get_neighbors_by_path_type(g, v, HAS_PRODUCT)
        products_canon = map(lambda n: decanonicalize_node(g, n), sorted(products))
        return 'rxn(reactants({}), products({}))'.format(', '.join(reactants_canon), ', '.join(products_canon))

    if data[FUNCTION] in (COMPOSITE, COMPLEX) and NAMESPACE not in data:
        members_canon = map(lambda n: decanonicalize_node(g, n), v[1:])
        return '{}({})'.format(rev_abundance_labels[data[FUNCTION]], ', '.join(members_canon))

    if VARIANTS in data:
        variants = ', '.join(sorted(map(decanonicalize_variant, data[VARIANTS])))
        return "{}({}:{}, {})".format(rev_abundance_labels[data[FUNCTION]],
                                      data[NAMESPACE],
                                      ensure_quotes(data[NAME]),
                                      variants)

    if FUSION in data:
        return "{}(fus({}:{}, {}, {}:{}, {}))".format(
            rev_abundance_labels[data[FUNCTION]],
            data[FUSION][PARTNER_5P][NAMESPACE],
            data[FUSION][PARTNER_5P][NAME],
            decanonicalize_fusion_range(data[FUSION][RANGE_5P]),
            data[FUSION][PARTNER_3P][NAMESPACE],
            data[FUSION][PARTNER_3P][NAME],
            decanonicalize_fusion_range(data[FUSION][RANGE_3P])
        )

    if data[FUNCTION] in {GENE, RNA, MIRNA, PROTEIN, ABUNDANCE, COMPLEX, PATHOLOGY, BIOPROCESS}:
        return "{}({}:{})".format(rev_abundance_labels[data[FUNCTION]],
                                  data[NAMESPACE],
                                  ensure_quotes(data[NAME]))

    raise ValueError('Unknown node data: {} {}'.format(v, data))


def decanonicalize_edge_node(g, node, edge_data, node_position):
    node_str = decanonicalize_node(g, node)

    if node_position not in edge_data:
        return node_str

    node_edge_data = edge_data[node_position]

    if LOCATION in node_edge_data:
        node_str = postpend_location(node_str, node_edge_data[LOCATION])

    if MODIFIER in node_edge_data and DEGRADATION == node_edge_data[MODIFIER]:
        node_str = "deg({})".format(node_str)
    elif MODIFIER in node_edge_data and ACTIVITY == node_edge_data[MODIFIER]:
        node_str = "act({}".format(node_str)
        if EFFECT in node_edge_data and node_edge_data[EFFECT]:
            ma = node_edge_data[EFFECT]

            if ma[NAMESPACE] == BEL_DEFAULT_NAMESPACE:
                node_str = "{}, ma({}))".format(node_str, ma[NAME])
            else:
                node_str = "{}, ma({}:{}))".format(node_str, ma[NAMESPACE], ensure_quotes(ma[NAME]))
        else:
            node_str = "{})".format(node_str)

    elif MODIFIER in node_edge_data and TRANSLOCATION == node_edge_data[MODIFIER]:

        from_loc = "fromLoc({}:{})".format(node_edge_data[EFFECT][FROM_LOC][NAMESPACE],
                                           ensure_quotes(node_edge_data[EFFECT][FROM_LOC][NAME]))

        to_loc = "toLoc({}:{})".format(node_edge_data[EFFECT][TO_LOC][NAMESPACE],
                                       ensure_quotes(node_edge_data[EFFECT][TO_LOC][NAME]))

        node_str = "tloc({}, {}, {})".format(node_str, from_loc, to_loc)

    return node_str


def decanonicalize_edge(g, u, v, k):
    """Takes two nodes and gives back a BEL string representing the statement

    :param g: A BEL graph
    :type g: :class:`BELGraph`
    :param u: The edge's source node
    :param v: The edge's target node
    :param k: The edge's key
    :return: The canonical BEL for this edge
    :rtype: str
    """

    ed = g.edge[u][v][k]

    u_str = decanonicalize_edge_node(g, u, ed, node_position=SUBJECT)
    v_str = decanonicalize_edge_node(g, v, ed, node_position=OBJECT)

    return "{} {} {}".format(u_str, ed[RELATION], v_str)


def flatten_citation(citation):
    return ','.join('"{}"'.format(citation[x]) for x in CITATION_ENTRIES[:len(citation)])


def sort_edges(d):
    return (flatten_citation(d[CITATION]), d[EVIDENCE]) + tuple(
        itt.chain.from_iterable(sorted(d[ANNOTATIONS].items(), key=itemgetter(0))))


def to_bel(graph, file=None):
    """Outputs the BEL graph as a canonical BEL Script (.bel)

    :param graph: the BEL Graph to output as a BEL Script
    :type graph: BELGraph
    :param file: a file-like object. If None, defaults to standard out.
    :type file: file
    """

    file = sys.stdout if file is None else file

    for k in sorted(graph.document):
        print('SET DOCUMENT {} = "{}"'.format(INVERSE_DOCUMENT_KEYS[k], graph.document[k]), file=file)

    print('###############################################\n', file=file)

    if GOCC_KEYWORD not in graph.namespace_url:
        graph.namespace_url[GOCC_KEYWORD] = GOCC_LATEST

    for namespace, url in sorted(graph.namespace_url.items(), key=itemgetter(0)):
        print('DEFINE NAMESPACE {} AS URL "{}"'.format(namespace, url), file=file)

    for namespace, url in sorted(graph.namespace_owl.items(), key=itemgetter(0)):
        print('DEFINE NAMESPACE {} AS OWL "{}"'.format(namespace, url), file=file)

    for namespace, pattern in sorted(graph.namespace_pattern.items(), key=itemgetter(0)):
        print('DEFINE NAMESPACE {} AS PATTERN "{}"'.format(namespace, pattern), file=file)

    print('###############################################\n', file=file)

    for annotation, url in sorted(graph.annotation_url.items(), key=itemgetter(0)):
        print('DEFINE ANNOTATION {} AS URL "{}"'.format(annotation, url), file=file)

    for annotation, url in sorted(graph.annotation_owl.items(), key=itemgetter(0)):
        print('DEFINE ANNOTATION {} AS OWL "{}"'.format(annotation, url), file=file)

    for annotation, pattern in sorted(graph.annotation_pattern.items(), key=itemgetter(0)):
        print('DEFINE ANNOTATION {} AS PATTERN "{}"'.format(annotation, pattern), file=file)

    for annotation, an_list in sorted(graph.annotation_list.items(), key=itemgetter(0)):
        an_list_str = ', '.join('"{}"'.format(e) for e in an_list)
        print('DEFINE ANNOTATION {} AS LIST {{{}}}'.format(annotation, an_list_str), file=file)

    print('###############################################\n', file=file)

    # sort by citation, then supporting text
    qualified_edges = filter(lambda u_v_k_d: CITATION in u_v_k_d[3] and EVIDENCE in u_v_k_d[3],
                             graph.edges_iter(data=True, keys=True))
    qualified_edges = sorted(qualified_edges, key=lambda u_v_k_d: sort_edges(u_v_k_d[3]))

    for citation, citation_edges in itt.groupby(qualified_edges, key=lambda t: flatten_citation(t[3][CITATION])):
        print('SET Citation = {{{}}}'.format(citation), file=file)

        for evidence, evidence_edges in itt.groupby(citation_edges, key=lambda u_v_k_d: u_v_k_d[3][EVIDENCE]):
            print('SET SupportingText = "{}"'.format(evidence), file=file)

            for u, v, k, d in evidence_edges:
                dkeys = sorted(d[ANNOTATIONS])
                for dk in dkeys:
                    print('SET {} = "{}"'.format(dk, d[ANNOTATIONS][dk]), file=file)
                print(decanonicalize_edge(graph, u, v, k), file=file)
                if dkeys:
                    print('UNSET {{{}}}'.format(', '.join('"{}"'.format(dk) for dk in dkeys)), file=file)
            print('UNSET SupportingText', file=file)
        print('\n', file=file)

    print('###############################################\n', file=file)

    print('SET Citation = {"Other","Added by PyBEL","https://github.com/pybel/pybel/"}', file=file)
    print('SET Evidence = "{}"'.format(PYBEL_AUTOEVIDENCE), file=file)

    for u in graph.nodes_iter():
        if any(d[RELATION] not in unqualified_edges for v in graph.adj[u] for d in graph.edge[u][v].values()):
            continue

        print(decanonicalize_node(graph, u), file=file)

    # Can't infer hasMember relationships, but it's not due to specific evidence or citation
    for u, v, d in graph.edges_iter(data=True, **{RELATION: HAS_MEMBER}):
        if EVIDENCE in d:
            continue

        print("{} {} {}".format(decanonicalize_node(graph, u), HAS_MEMBER,
                                decanonicalize_node(graph, v)), file=file)
