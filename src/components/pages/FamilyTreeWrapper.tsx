import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { wholeEdgesState } from '../../recoil/WholeEdgesState';
import { selectedNodeState } from '../../recoil/selectedNodeState';
import { nodesUpdatedState } from '../../recoil/nodesUpdatedState';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { personNode } from '../parts/CustomNode';
import { maritalNode } from '../parts/MaritalStatusNode';
import ReactFlow, { Background, BackgroundVariant, Connection, Edge, addEdge, useEdgesState, useNodesState, useReactFlow, useViewport } from 'reactflow';
import { filterDirectLineagesNodes } from '../../utils/filterDirectLineageNodes';
import { calculateNodesPosition } from '../../utils/calculateNodesPosition';
import { Box } from '@chakra-ui/react';
import { isPersonNodeData } from '../../typeGuards/personTypeGuards';
import { PersonNodeData } from '../../types/PersonNodeData';

export const FamilyTreeWrapper = (props: {onOpen: () => void}) => {
  const { onOpen } = props
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const nodeTypes = useMemo(() => ({ person: personNode, marital: maritalNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges as Edge[]);
  const onConnect = useCallback((params: Connection) => setEdges(eds => addEdge(params, eds)), []);
  const { setCenter } = useReactFlow();

  const { x, y, zoom } = useViewport();
  const reactFlowInstance = useReactFlow();
  useEffect(() => {
    setSelectedNode(wholeNodes[0] as PersonNodeData);
  }, []);

  useEffect(() => {
    reactFlowInstance.fitView({
      padding: 20,
    });
  }, [reactFlowInstance]);
  useEffect(() => {
    console.log('wholeNodes', wholeNodes);
    if (nodesUpdated && selectedNode) {
      const calculatedWholeNodes = calculateNodesPosition(wholeNodes, selectedNode);
      if (!calculatedWholeNodes) return;
      setWholeNodes(calculatedWholeNodes);
      const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(
        calculatedWholeNodes,
        wholeEdges,
        selectedNode
      );
      setNodes(directLineageNodes);
      setEdges(directLineageEdges);
      setNodesUpdated(false);
      setCenter(selectedNode?.position.x, selectedNode?.position.y, { zoom, duration: 1000 });
    }
  }, [nodesUpdated]);

  useEffect(() => {
    if (selectedNode) {
      setNodesUpdated(true);
    }
  }, [selectedNode])

  const handleNodeClick = (clickedNode: PersonNodeData) => {
    setSelectedNode(clickedNode);
    if (selectedNode && clickedNode.id === selectedNode.id) {
      onOpen();
    } 
  };

  return (
    <Box w="100vw" h="100vh" className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => {
          if (isPersonNodeData(node)) {
            handleNodeClick(node);
          }
        }}
        nodesDraggable={false}
        fitView
        fitViewOptions={{ padding: 10 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ddd" variant={BackgroundVariant.Lines} gap={[340, 250]} />
      </ReactFlow>
    </Box>
  );
};
