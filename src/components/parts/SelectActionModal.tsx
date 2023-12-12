import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from "react";
import { ProfileEditor } from './ProfileEditor';
import { PersonNodeData } from '../../types/PersonNodeData';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  showProfileEditor: boolean;
  setShowProfileEditor: Dispatch<SetStateAction<boolean>>;
  selectedNode: PersonNodeData | null;
  addParent: () => void;
  addChild: () => void;
  addSpouse: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(props => {
  const { isOpen, onClose, showProfileEditor, setShowProfileEditor, selectedNode, addParent, addChild, addSpouse } = props;
  // const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  let hasParents = false;
  let hasSpouse = false;
  if (selectedNode) {
    hasParents = !!selectedNode.data.parents.length;
    hasSpouse = !!selectedNode.data.spouse.length;
    console.log(selectedNode.data.spouse.length, hasSpouse);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showProfileEditor ? (
            <ProfileEditor onClose={onClose} selectedNode={selectedNode} setShowProfileEditor={setShowProfileEditor} />
          ) : (
            <>
              <Text>{selectedNode?.data.birthDate}</Text>
              <Text>{selectedNode?.data.birthMonth}</Text>
              <Text>{selectedNode?.data.birthYear}</Text>
              <Text>{selectedNode?.id}</Text>
              <Flex wrap="wrap" gap={5}>
                <Button
                  isDisabled={hasParents}
                  onClick={() => {
                    addParent();
                    onClose();
                  }}
                >
                  親を追加
                </Button>
                <Button
                  onClick={() => {
                    addChild();
                    onClose();
                  }}
                >
                  子を追加
                </Button>
                <Button
                  isDisabled={hasSpouse}
                  onClick={() => {
                    addSpouse();
                    onClose();
                  }}
                >
                  配偶者を追加
                </Button>
                <Button
                  onClick={() => {
                    displayProfileEditor();
                  }}
                >
                  情報を編集
                </Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
