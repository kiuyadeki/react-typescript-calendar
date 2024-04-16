import { Box, Center, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PersonData, PersonNodeData } from "../../types/PersonNodeData";
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from "../../utils/constants";
import { AnimatePresence, Variants, easeOut, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { selectedNodeState } from "../../recoil/selectedNodeState";
import { BiSolidUser } from "react-icons/bi";
import styled from '@emotion/styled';

export const personNode = (props: NodeProps<PersonData>) => {
  const { id, data } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const imageFile = data.profilePicture;
  const isSelected = id === selectedNode?.id;
  const imageURL = imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;
  const variants: Variants = {
    initial: {
      opacity: 0,
      // y: -16
    },
    animate: {
      opacity: 1,
      // y: 0
    },
    exit: {
      opacity: 0,
      // y: -16
    },
  };

  const StyledHandle = styled(Handle)`
    opacity: 0;
    border: none;
    pointer-events: none;
    background: #ccc;
  `;

  return (
    <AnimatePresence>
      <motion.div
        key={data.label}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          // px={4}
          // py={2}
          w={`${BASE_PERSON_NODE_WIDTH}px`}
          borderRadius="50%"
          aspectRatio="1"
          shadow={"md"}
          position="relative"
        >
          <StyledHandle type="source" position={Position.Right} id="personSourceRight" />
          <StyledHandle type="source" position={Position.Left} id="personSourceLeft" />
          <StyledHandle type="source" position={Position.Top} id="personSourceTop" />

          <Center w="100%" h="100%" overflow="hidden" borderRadius="50%" position="relative" bg={isSelected ? "blue.500" : "white"} transform={"scale(1.1)"}>
            <Box position="absolute" inset="0" borderRadius="50%" mt={4}>
              {imageURL ? <Image src={imageURL} /> : <BiSolidUser size={100} color="#ffffff" />}
            </Box>
          </Center>

          <Box position="absolute">
            <Text fontSize="md">{id}</Text>
            <Text fontSize="md">{data.label}</Text>
            <Text fontSize="md">{data.lastName}</Text>
            <Text fontSize="md">{data.firstName}</Text>
            <Text fontSize="md">{data.birthYear}</Text>
            <Text fontSize="md">{data.birthMonth}</Text>
            <Text fontSize="md">{data.birthDate}</Text>
            <Text fontSize="md">{data.gender}</Text>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};
