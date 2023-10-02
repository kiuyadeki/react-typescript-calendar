import { Box } from "@chakra-ui/react";
import { FC, memo } from "react";
import ReactFlow from "reactflow";
import 'reactflow/dist/style.css';

export const FamilyTree: FC = memo(() => {

  const initialNodes = [
    {id: '1', position: {x: 0, y: 0}, data: {label: '1'}},
    {id: '2', position: {x: 0, y: 0}, data: {label: '2'}},
  ]

  const initialEdges = [{id: 'e1-2', source: '1', target: '2'}];

  return (
    <Box w='100vw' h="100vw">
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </Box>
  )
})