import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PersonNodeData } from '../../types/PersonNodeData';

// type PersonNodeData = {
//   label: string;
//   firstName?: string;
//   lastName?: string;
//   birthYear?: number;
//   birthMonth?: number;
//   birthDate?: number;
//   gender?: string;
//   profilePicture?: File;
//   parents: (string | number)[];
//   children: (string | number)[];
//   spouse: (string | number)[];
//   numberOfDescendant?: number;
//   numberOfAncestors?: number;
// };

type PersonNodeProps = Omit<NodeProps, 'data'> & {
  data: PersonNodeData['data'];
};
export const personNode: FC<PersonNodeProps> = props => {
  const { data } = props;
  const imageFile = data.profilePicture;
  const imageURL = imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;

  return (
    <Box px={4} py={2} bg="white" w="200px" borderRadius="md" shadow={"md"} transform={"translate(-50%, -50%)"}>
      <Handle type="source" position={Position.Bottom} id='toChild' />
      <Handle type="source" position={Position.Top} id='toMarital' />
      <Handle type="source" position={Position.Right} id='toRight' />
      <Handle type="source" position={Position.Left} id='toLeft' />

      <Handle type="target" position={Position.Top} id='fromMarital' />
      <Handle type="target" position={Position.Right} id='fromRight' />
      <Handle type="target" position={Position.Left} id='fromLeft' />
      <Text fontSize='md'>{data.label}</Text>
      <Text fontSize='md'>{data.lastName}</Text>
      <Text fontSize='md'>{data.firstName}</Text>
      <Text fontSize='md'>{data.birthYear}</Text>
      <Text fontSize='md'>{data.birthMonth}</Text>
      <Text fontSize='md'>{data.birthDate}</Text>
      <Text fontSize='md'>{data.gender}</Text>
      <Box>
        <Image src={imageURL} />
      </Box>
    </Box>
  );
};
