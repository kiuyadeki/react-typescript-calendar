import { Box, Button } from "@chakra-ui/react";
import { graphlib, layout } from "@dagrejs/dagre";
import { memo, useCallback } from "react";
import ReactFlow, { Connection, ConnectionLineType, Edge, Node, Panel, Position, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position,
  },
  { id: '7', type: 'output', data: { label: 'output' }, position },
];
const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
  { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
  { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
  { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
  { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
  { id: 'e57', source: '5', target: '7', type: edgeType, animated: true },
];


const graph = new graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  graph.setGraph({ rankdir: direction});

  nodes.forEach((node) => {
    graph.setNode(node.id, { width: nodeWidth, height: nodeHeight});
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  layout(graph);

  nodes.forEach((node) => {
    const NodeWithPosition = graph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: NodeWithPosition.x - nodeWidth / 2,
      y: NodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges};
}

const { nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(
  initialNodes,initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  const onLayout = useCallback((direction: string) => {
    const { nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(nodes, edges, direction);
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  return (
    <Box w="100vw" h="100vh">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Panel position="top-right">
        <Button onClick={() => onLayout('TB')}>Vertical Layout</Button>
        <Button onClick={() => onLayout('LR')}>Horizontal Layout</Button>
      </Panel>
    </ReactFlow>
    </Box>
  );
};

export const DagreTree = memo(() => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  )
})