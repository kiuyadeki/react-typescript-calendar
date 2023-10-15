import { Box, ControlBox, useDisclosure } from "@chakra-ui/react";
import { FC, MouseEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Controls, Edge, HandleType, MiniMap, Node, OnConnectEnd, OnConnectStart, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';
import { SelectActionModal } from '../parts/SelectActionModal';
import { personNode } from '../parts/CustomNode';

const initialNodes = [
  {
    id: '0',
    type: 'person',
    data: { 
      label: 'Node',
      date_of_birth: 1997, 
    },
    position: {x: 0, y: 50},
  },
];

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

type Connection = {
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
};

type OnConnectStartParams = {
  nodeId: string | null;
  handleId: string | null;
  handleType: HandleType | null;
};


const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<null | any>(null)
  const nodeTypes = useMemo(() => ( {person: personNode}), []);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const { isOpen, onOpen, onClose} = useDisclosure();

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    onOpen();
  }

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);


  const addParentToSelectedNode = () => {
    if(selectedNode) {
      const parentId = getId();
      const parentNode: Node = {
        id: parentId,
        data: { label: `Parent of ${selectedNode.data.label}`},
        position: { x: selectedNode.position.x, y: selectedNode.position.y - 100},
      };
      setNodes(prevNodes => [...prevNodes, parentNode]);
      const newEdgeId = `edge-${parentId}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, { id: newEdgeId, source: parentId, target: selectedNode.id, sourceHandle: 'husband', targetHandle: 'wife' }]);
    }
  }

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
          fitView
          fitViewOptions={fitViewOptions}
        />
      </Box>
      <SelectActionModal 
        isOpen={isOpen} 
        onClose={onClose} 
        selectedNode={selectedNode} 
        addParent={addParentToSelectedNode}
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