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
import { useForm } from 'react-hook-form';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: any;
  addParent: () => void;
  addChild: () => void;
  addSpouse: () => void;
};

type Inputs = {
  name: string;
}

export const SelectActionModal: FC<SelectActionModalProps> = memo(props => {
  const { isOpen, onClose, selectedNode, addParent, addChild, addSpouse } = props;
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  const {
    handleSubmit, 
    register, 
    formState: {errors, isSubmitting},
  } = useForm<Inputs>();

  const onSubmit = handleSubmit((values) =>  {
    return new Promise<void>((resolve) =>{
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        resolve();
      }, 3000)
    })
  });

  console.table("node", selectedNode);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showProfileEditor ? (
            <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">名字</FormLabel>
              <Input
                id="name"
                placeholder="name"
                {...register("name", {
                  required: "This is required",
                })}
              ></Input>
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <Button mt={4} isLoading={isSubmitting} type="submit">
              submit
            </Button>
          </form>
          ) : (
            <>
              <Text>{selectedNode?.data.date_of_birth}</Text>
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
