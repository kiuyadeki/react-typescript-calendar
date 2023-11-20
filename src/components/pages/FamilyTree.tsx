import { Box, useDisclosure } from "@chakra-ui/react";
import { FC, MouseEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Connection, ConnectionMode, ConnectionStatus, Controls, Edge, HandleType, MiniMap, Node, OnConnectEnd, OnConnectStart, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';
import { SelectActionModal } from '../parts/SelectActionModal';
import { personNode } from '../parts/CustomNode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { useAddParentToSelectedNode } from '../../hooks/useAddParentToSelectedNode';
import { useAddChildToSelectedNode } from '../../hooks/useAddChildToSelectedNode';
import { useAddSpouseToSelectedNode } from '../../hooks/useAddSpouseToSelectedNode';
import { HiddenNode } from '../parts/HiddenNode';

let id = 1;
const getId = () => `${id++}`;
const AddNodeOnEdgeDrop = () => {
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null)
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);


  // react flow
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const fitViewOptions = {
    padding: 3,
  };
  const defaultViewport = {x: 0, y: 0, zoom: 5}
  const nodeTypes = useMemo(() => ( {person: personNode, hidden: HiddenNode}), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);


  // modal
  const { isOpen, onOpen, onClose} = useDisclosure();
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    onOpen();
  }

  const handleCloseModal = () => {
    setShowProfileEditor(false);
    onClose();
  }

  useEffect(() => {
    console.log('selectedNode', selectedNode?.id);
  }, [selectedNode]);

  useEffect(() => {
    console.log('nodes', nodes);
  }, [nodes]);

  useEffect(() => {
    setNodes(wholeNodes)
  }, [wholeNodes]);

  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setEdges, getId, selectedNode);
  const addChildToSelectedNode = useAddChildToSelectedNode(setWholeNodes, setEdges, getId, selectedNode);
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setWholeNodes, setEdges, getId, selectedNode);

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
          onNodeClick={(e, node) => handleNodeClick(node)}
          defaultViewport={defaultViewport}
          fitView
          fitViewOptions={fitViewOptions}
        />
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