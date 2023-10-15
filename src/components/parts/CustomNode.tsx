import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

type PersonNodeData = {
  label: string;
  name?: string;
  date_of_birth?: number;
  date_of_death?: number;
  gender: string;
  profile_image_filename?: string;
  has_parents: boolean;
  has_children: boolean;
  has_spouse: boolean;
};

export const personNode: FC<NodeProps> = props => {
  const { data } = props;
  return (
    <Box p={5} bg="white" w="xs" borderRadius="md" shadow={"md"}>
      <Handle type="source" position={Position.Bottom} id='parent' />
      <Handle type="target" position={Position.Top} id='child' />

      <Handle type="source" position={Position.Right} id='husband' />
      <Handle type="target" position={Position.Left} id='wife' />
      <Text>{data.label}</Text>
    </Box>
  );
};
