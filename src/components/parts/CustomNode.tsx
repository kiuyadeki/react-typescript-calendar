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

type PersonNodeProps = Omit<NodeProps, 'data'> & {
  data: PersonNodeData;
};
export const personNode: FC<PersonNodeProps> = props => {
  const { data } = props;
  return (
    <Box px={4} py={2} bg="white" w="200px" borderRadius="md" shadow={"md"}>
      <Handle type="source" position={Position.Bottom} id='parent' />
      <Handle type="target" position={Position.Top} id='child' />

      <Handle type="source" position={Position.Right} id='husband' />
      <Handle type="target" position={Position.Left} id='wife' />
      <Text fontSize='md'>{data.label}</Text>
    </Box>
  );
};
