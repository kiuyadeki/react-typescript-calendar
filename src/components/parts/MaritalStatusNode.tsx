import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, Position } from "reactflow";

export const MaritalStatusNode: FC = () => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Box onClick={handleClick} bg="white" shadow={"md"} w="10px" h="10px" transform={"translate(-50%, -50%)"}>
      <Handle type="target" position={Position.Right} id="maritalTargetRight" />
      <Handle type="target" position={Position.Left} id="maritalTargetLeft" />
      <Handle type="target" position={Position.Bottom} id="maritalTargetBottom" />
    </Box>
  );
};
