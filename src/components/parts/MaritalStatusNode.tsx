import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { BASE_MARITAL_NODE_HEIGHT, BASE_MARITAL_NODE_WIDTH } from '../../utils/constants';
import { maritalData } from '../../types/PersonNodeData';

export const maritalNode = (props: NodeProps<maritalData>) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleClick}
      bg="white"
      shadow={"md"}
      w={`${BASE_MARITAL_NODE_WIDTH}px`}
      h={`${BASE_MARITAL_NODE_HEIGHT}px`}
    >
      <Handle type="target" position={Position.Right} id="maritalTargetRight" />
      <Handle type="target" position={Position.Left} id="maritalTargetLeft" />
      <Handle type="target" position={Position.Bottom} id="maritalTargetBottom" />
    </Box>
  );
};
