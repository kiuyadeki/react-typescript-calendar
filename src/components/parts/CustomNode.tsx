import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PersonNodeData } from "../../types/PersonNodeData";
import { BASE_PERSON_NODE_WIDTH } from '../../utils/constants';

type PersonNodeProps = Omit<NodeProps, "data"> & {
  data: PersonNodeData["data"];
};
export const personNode: FC<PersonNodeProps> = props => {
  const { data } = props;
  const imageFile = data.profilePicture;
  const imageURL = imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;

  const keysToShow = ['label', 'descendants', 'ancestors'];

  return (
    <Box px={4} py={2} bg="white" w={`${BASE_PERSON_NODE_WIDTH}px`} borderRadius="md" shadow={"md"} transform={"translate(-50%, -50%)"}>
      <Handle type="source" position={Position.Right} id="personSourceRight" />
      <Handle type="source" position={Position.Left} id="personSourceLeft" />
      <Handle type="source" position={Position.Top} id="personSourceTop" />

      {/* {keysToShow.map((key) => 
        data[key as keyof typeof data] && <Text fontSize="md" key={key}>{`${key}: ${(data as any)[key]}`}</Text>
      )} */}

      <Text fontSize="md">{data.label}</Text>
      <Text fontSize="md">{data.lastName}</Text>
      <Text fontSize="md">{data.firstName}</Text>
      <Text fontSize="md">{data.birthYear}</Text>
      <Text fontSize="md">{data.birthMonth}</Text>
      <Text fontSize="md">{data.birthDate}</Text>
      <Text fontSize="md">{data.gender}</Text>
      <Box>
        <Image src={imageURL} />
      </Box>
    </Box>
  );
};
