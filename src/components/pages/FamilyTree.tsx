import { Box, ControlBox } from "@chakra-ui/react";
import { FC, MouseEvent, memo, useCallback, useRef } from "react";
import ReactFlow, { Background, Controls, Edge, HandleType, MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css';


const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node'},
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

type OnConnectStartType = (event: React.MouseEvent<Element> | React.TouchEvent<Element>, params: OnConnectStartParams) => void;

type onConnectEndType = (event: React.MouseEvent<Element> | React.TouchEvent<Element>) => void;

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnectStart: OnConnectStartType = useCallback((event, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: any = useCallback(
    (event: any) => {
      const targetElement = event.target as HTMLElement;
      const targetIsPane = targetElement?.classList.contains('react-flow__pane');
      if (targetIsPane && reactFlowWrapper.current) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          position: project({ x: event.clientX - left - 150, y: event.clientY - top}),
          data: {label: `Node ${id}`},
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current as string, target: id} as Edge<any>));
        console.log(edges, nodes);
      }
    },
    [project]
  );

  return (
    <Box w="100vw" h="100vh" className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes = {nodes}
        edges = {edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </Box>
  );
}

export const FamilyTree: FC = memo(() => {
  return (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
  )
})