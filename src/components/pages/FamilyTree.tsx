import { useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { SelectActionModal } from "../parts/SelectActionModal";
import { FamilyTreeWrapper } from './FamilyTreeWrapper';

const AddNodeOnEdgeDrop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <FamilyTreeWrapper onOpen={onOpen} />
      <SelectActionModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export const FamilyTree: FC = memo(() => {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
});
