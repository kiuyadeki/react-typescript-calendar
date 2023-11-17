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
import { FC, memo, useEffect, useState } from "react";
import { ProfileEditor } from './ProfileEditor';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: any;
  addParent: () => void;
  addChild: () => void;
  addSpouse: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(props => {
  const { isOpen, onClose, selectedNode, addParent, addChild, addSpouse } = props;
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

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
              <Text>{selectedNode?.data.date_of_birth}</Text>
              <Text>{selectedNode?.data.date_of_death}</Text>
              <Text>{selectedNode?.data.daaa}</Text>
              <Text>{selectedNode?.id}</Text>
              <Flex wrap="wrap" gap={5}>
                <Button
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
