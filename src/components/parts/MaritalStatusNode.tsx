import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, Position } from "reactflow";

export const MaritalStatusNode: FC = () => {

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <Box onClick={handleClick} bg="white" shadow={"md"} w="10px" h="10px" transform={"translate(-50%, -50%)"}>
      <Handle type="source" position={Position.Bottom} id='toChild' />
      <Handle type="source" position={Position.Right} id='toRight' />
      <Handle type="source" position={Position.Left} id='toLeft' />

      <Handle type="target" position={Position.Bottom} id='fromChild' />
      <Handle type="target" position={Position.Right} id='fromRight' />
      <Handle type="target" position={Position.Left} id='fromLeft' />
    </Box>
  );
};
