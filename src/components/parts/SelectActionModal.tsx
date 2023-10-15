import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useNodesState } from 'reactflow';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: any;
  addParent: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo((props) => {
  const { isOpen, onClose, selectedNode, addParent } = props;
  console.table("node", selectedNode);

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedNode?.data.date_of_birth}</Text>
            <Text>{selectedNode?.id}</Text>
            <Flex wrap="wrap" gap={5}>
            <Button onClick={addParent}>親を追加</Button>
            <Button>子を追加</Button>
            <Button>配偶者を追加</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
})