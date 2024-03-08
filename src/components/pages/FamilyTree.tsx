import { Box, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, BackgroundVariant, Connection, ConnectionMode, ConnectionStatus, Controls, Edge, HandleType, MiniMap, Node, NodeChange, OnConnectEnd, OnConnectStart, ReactFlowProvider, XYPosition, addEdge, useEdgesState, useNodesState, useReactFlow, useViewport } from "reactflow";
import 'reactflow/dist/style.css';
import { SelectActionModal } from '../parts/SelectActionModal';
import { personNode } from '../parts/CustomNode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { useAddParentToSelectedNode } from '../../hooks/useAddParentToSelectedNode';
import { useAddChildToSelectedNode } from '../../hooks/useAddChildToSelectedNode';
import { useAddSpouseToSelectedNode } from '../../hooks/useAddSpouseToSelectedNode';
import { MaritalStatusNode } from '../parts/MaritalStatusNode';
import { wholeEdgesState } from '../../recoil/WholeEdgesState';
import { PersonNodeData } from '../../types/PersonNodeData';
import { useCalculateNodesPosition } from '../../hooks/useCalculateNodesPosition';
import { useDirectLineage } from '../../hooks/useSetVisibleNodes';

const AddNodeOnEdgeDrop = () => {
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useState<null | PersonNodeData>(null)
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);
  const [nodesUpdated, setNodesUpdated] = useState(false);


  // react flow
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const fitViewOptions = {
    padding: 10,
  };
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const defaultViewport = {x: windowWidth / 2, y: windowHeight / 2, zoom: 1}
  const nodeTypes = useMemo(() => ( {person: personNode, marital: MaritalStatusNode}), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges as Edge[]);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  // modal
  const { isOpen, onOpen, onClose} = useDisclosure();
  const handleNodeClick = (node: PersonNodeData) => {
    setSelectedNode(node);
    onOpen();
  }
  const handleCloseModal = () => {
    setShowProfileEditor(false);
    onClose();
  }

  const { directLineageNodes, directLineageEdges} = useDirectLineage(wholeNodes, wholeEdges, selectedNode);

  const {x, y, zoom} = useViewport();
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    reactFlowInstance.fitView({
      padding: 20,
    });
  }, [reactFlowInstance]);
  
  useEffect(() => {
    if(nodesUpdated) {
      setNodes(directLineageNodes);
      useCalculateNodesPosition(wholeNodes, selectedNode, wholeEdges);
      setNodesUpdated(false);
    }
  },[nodesUpdated, wholeNodes, selectedNode]);
  
  useEffect(() => {
    setEdges(directLineageEdges);
  }, [wholeEdges]);
  
  useEffect(() => {
    useCalculateNodesPosition(wholeNodes, selectedNode, wholeEdges);
    console.log('selectedNodeChanged', selectedNode?.id);
  }, [selectedNode]);

  useEffect(() => {
    console.log('wholeNodes', wholeNodes);
    console.log('wholeEdges', wholeEdges);
  }, [wholeNodes, nodes]);

  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setWholeEdges, selectedNode, () => setNodesUpdated(true));
  const addChildToSelectedNode = useAddChildToSelectedNode(wholeNodes, setWholeNodes, wholeEdges, setWholeEdges, selectedNode, () => setNodesUpdated(true));
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setWholeNodes, setWholeEdges, selectedNode, () => setNodesUpdated(true));

  return (
    <>
      <Box w="100vw" h="100vh" className="wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes = {nodes}
          edges = {edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(e, node) => {
            if (node.type === "person") {
              handleNodeClick(node as PersonNodeData);
            }
          }}
          fitView
          fitViewOptions={fitViewOptions}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#ddd" variant={BackgroundVariant.Lines} gap={[340, 250]} />
        </ReactFlow>
      </Box>
      <SelectActionModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        showProfileEditor={showProfileEditor}
        setShowProfileEditor={setShowProfileEditor}
        selectedNode={selectedNode}
        addParent={addParentToSelectedNode}
        addChild = {addChildToSelectedNode}
        addSpouse = {addSpouseToSelectedNode}
      />
    </>

  );
}

export const FamilyTree: FC = memo(() => {
  return (
      <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
      </ReactFlowProvider>
  )
})