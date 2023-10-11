import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { FC, memo } from 'react';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo((props) => {
  const { isOpen, onClose } = props;

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>hey</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
})