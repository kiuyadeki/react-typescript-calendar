import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, Position } from "reactflow";

// type HiddenNodeData = {
//   has_parents: boolean;
//   has_children: boolean;
// };

// type HiddenNodeProps = Omit<NodeProps, 'data'> & {
//   data: HiddenNodeData;
// };
export const HiddenNode: FC = () => {
  return (
    <Box bg="white" shadow={"md"}>
      <Handle type="source" position={Position.Bottom} id='parent' />
      <Handle type="target" position={Position.Top} id='child' />
      <Handle type="source" position={Position.Right} id='husband' />
      <Handle type="target" position={Position.Left} id='wife' />
    </Box>
  );
};
