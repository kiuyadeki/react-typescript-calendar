import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, Position } from "reactflow";

export const MaritalNode: FC = () => {
  return (
    <Box bg="white" shadow={"md"} w="10px" h="10px">
      <Handle type="source" position={Position.Bottom} id='toChild' />
      <Handle type="target" position={Position.Bottom} id='fromChild' />
      <Handle type="source" position={Position.Right} id='toRight' />
      <Handle type="target" position={Position.Right} id='fromRight' />
      <Handle type="source" position={Position.Left} id='toLeft' />
      <Handle type="target" position={Position.Left} id='fromLeft' />
    </Box>
  );
};
