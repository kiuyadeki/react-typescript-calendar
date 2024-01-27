import { Box, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Connection, ConnectionMode, ConnectionStatus, Controls, Edge, HandleType, MiniMap, Node, OnConnectEnd, OnConnectStart, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
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


  // react flow
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const fitViewOptions = {
    padding: 3,
  };
  const defaultViewport = {x: 0, y: 0, zoom: 5}
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

  useEffect(() => {
    useCalculateNodesPosition(wholeNodes, selectedNode);
    console.log('nodes', nodes);
    console.log('directLineageNodes', directLineageNodes);
  }, [wholeNodes, nodes]);

  useEffect(() => {
    console.log('edges', edges);
  }, [wholeEdges, edges]);

  useEffect(() => {
    setEdges(wholeEdges);
  }, [wholeEdges]);

  useEffect(() => {
    setNodes(wholeNodes);
  }, [wholeNodes]);

  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setWholeEdges, selectedNode);
  const addChildToSelectedNode = useAddChildToSelectedNode(wholeNodes, setWholeNodes, wholeEdges, setWholeEdges, selectedNode);
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setWholeNodes, setWholeEdges, selectedNode);

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
          defaultViewport={defaultViewport}
          fitView
          fitViewOptions={fitViewOptions}
          proOptions={{ hideAttribution: true }}
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