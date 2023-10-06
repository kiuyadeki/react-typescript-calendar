import { Box, ControlBox } from "@chakra-ui/react";
import { FC, memo, useCallback, useRef } from "react";
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState, useReactFlow } from "reactflow";
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

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef<HTMLElement | null>(null);
  const connectingNodeId = useRef<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnectStart = useCallback((_: Event, { nodeId }: {nodeId: string}) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      const targetIsPane = targetElement?.classList.contains('react-flow__pane');
      if (targetIsPane && reactFlowWrapper.current) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          position: project({ x: event.clientX - left - 75, y: event.clientY - top}),
          data: {label: `Node ${id}`},
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id}));
      }
    },
    [project]
  );

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
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
    </div>
  );
}

export const FamilyTree: FC = memo(() => {
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
})