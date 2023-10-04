import { Box, ControlBox } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css';


export const FamilyTree: FC = memo(() => {
  type Connection = {
    source: string | null;
    target: string | null;
    sourceHandle: string | null;
    targetHandle: string | null;
  };
  const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 0, y: 100}, data: {label: '2'}},
  ];
  const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => {
    return setEdges((eds) => {
      return addEdge(params, eds);
    });
  }, [setEdges]);

  return (
    <Box w='100vw' h="100vw">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  )
})