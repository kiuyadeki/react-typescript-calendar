import { Box, Button, ControlBox, FormControl, FormErrorMessage, FormLabel, Input, useDisclosure } from "@chakra-ui/react";
import { FC, MouseEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Connection, ConnectionMode, ConnectionStatus, Controls, Edge, HandleType, MiniMap, Node, OnConnectEnd, OnConnectStart, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';
import { SelectActionModal } from '../parts/SelectActionModal';
import { personNode } from '../parts/CustomNode';
import { useRecoilValue } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { useAddParentToSelectedNode } from '../../hooks/useAddParentToSelectedNode';
import { useAddChildToSelectedNode } from '../../hooks/useAddChildToSelectedNode';
import { useAddSpouseToSelectedNode } from '../../hooks/useAddSpouseToSelectedNode';

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

  const addParentToSelectedNode = useAddParentToSelectedNode(setNodes, setEdges, getId, selectedNode);
  const addChildToSelectedNode = useAddChildToSelectedNode(setNodes, setEdges, getId, selectedNode);
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setNodes, setEdges, getId, selectedNode);

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