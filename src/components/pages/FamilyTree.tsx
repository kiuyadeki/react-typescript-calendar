import { Box, Button, ControlBox, FormControl, FormErrorMessage, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import { FC, MouseEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Connection, ConnectionMode, ConnectionStatus, Controls, Edge, HandleType, MiniMap, Node, OnConnectEnd, OnConnectStart, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';
import { SelectActionModal } from '../parts/SelectActionModal';
import { personNode } from '../parts/CustomNode';
import { useRecoilValue } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';

const initialNodes = [
  {
    id: '0',
    type: 'person',
    data: { 
      label: 'Node',
      date_of_birth: 1997, 
      date_of_death: 3000, 
    },
    position: {x: 0, y: 50},
  },
];

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};
const defaultViewport = {x: 0, y: 0, zoom: 5}

const AddNodeOnEdgeDrop = () => {
  const wholeNodes = useRecoilValue(wholeNodesState);
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null)
  const nodeTypes = useMemo(() => ( {person: personNode}), []);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);
  // modal
  const { isOpen, onOpen, onClose} = useDisclosure();
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    onOpen();
  }


  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  // 親を追加
  const addParentToSelectedNode = () => {
    if(selectedNode) {
      const parentId = getId();
      const parentNode: Node = {
        type: 'person',
        id: parentId,
        data: { label: `Parent of ${selectedNode.data.label}`},
        position: { x: selectedNode.position.x, y: selectedNode.position.y - 100},
      };
      setNodes(prevNodes => [...prevNodes, parentNode]);
      const newEdgeId = `edge-${parentId}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, { id: newEdgeId, source: parentId, target: selectedNode.id, sourceHandle: 'parent', targetHandle: 'child' }]);
    }
  }

  // 子を追加
  const addChildToSelectedNode = () => {
    if(selectedNode) {
      const childId = getId();
      const childNode: Node = {
        type: 'person',
        id: childId,
        data: { label: `Child of ${selectedNode.data.label}`},
        position: {x: selectedNode.position.x, y:selectedNode.position.y + 100},
      };
      setNodes(prevNodes => [...prevNodes, childNode]);
      const NewEdgeId = `edge-${childId}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: childId, sourceHandle: 'parent', targetHandle: 'child'}]);
    }
  }

  // 配偶者を追加
  const addSpouseToSelectedNode = () => {
    if(selectedNode) {
      const SpouseID = getId();
      const SpouseNode: Node = {
        type: 'person',
        id: SpouseID,
        data: {label: `Spouse of ${selectedNode.data.label}`},
        position: {x: selectedNode.position.x + 300, y:selectedNode.position.y}
      };
      setNodes(prevNodes => [...prevNodes, SpouseNode]);
      const NewEdgeId = `edges-${SpouseID}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: SpouseID, sourceHandle: 'husband', targetHandle: 'wife'}]);
    }
  }

  // const hasEdgeFromHandle = (edges: Edge[], nodeId: string, handleID: string) => {
  //   return edges.some(edge =>
  //       (edge.source === nodeId && edge.sourceHandle === handleID) || (edge.target === nodeId && edge.targetHandle === handleID));
  // };

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
        onClose={onClose} 
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