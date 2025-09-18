import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph({compound: true});
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 75;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({
    rankdir: direction,
    // acyclicer: 'greedy',
    ranker: 'network-simplex',
    ranksep: 80, // tăng khoảng cách giữa các tầng
    nodesep: 60,  // tăng khoảng cách giữa các node
    marginx: 40,
    marginy: 40,
  });

  for (let i = 1; i <= 6; i++) {
    dagreGraph.setNode("layer" + i, { rank: "same" });
  }

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight});
    dagreGraph.setParent(node.id, "layer" + node.rank);
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map(node => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: x - nodeWidth / 2, y: y - nodeHeight / 2 },
    };
  });

  return { nodes: layoutedNodes, edges };
};