import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { PersonData, PersonNodeData } from "../../types/PersonNodeData";
import { BASE_PERSON_NODE_HEIGHT, BASE_PERSON_NODE_WIDTH } from "../../utils/constants";
import { AnimatePresence, Variants, easeOut, motion } from "framer-motion";
import { useRecoilValue } from 'recoil';
import { selectedNodeState } from '../../recoil/selectedNodeState';
import { BiSolidUser } from "react-icons/bi";

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
    }
  };

  return (
    <AnimatePresence>
    <motion.div key={data.label} variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.8, ease: "easeOut" }}>
      <Box
        px={4}
        py={2}
        bg={isSelected ? "blue.500" : "white"}
        w={`${BASE_PERSON_NODE_WIDTH}px`}
        borderRadius="md"
        shadow={"md"}
      >
        <Handle type="source" position={Position.Right} id="personSourceRight" />
        <Handle type="source" position={Position.Left} id="personSourceLeft" />
        <Handle type="source" position={Position.Top} id="personSourceTop" />

        <BiSolidUser color="#ffffff" />
        <Text fontSize="md">{id}</Text>
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
    </motion.div>
    </AnimatePresence>
  );
};
