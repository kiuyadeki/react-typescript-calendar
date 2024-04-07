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
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedNodeState } from '../../recoil/selectedNodeState';
import { useAddParentToSelectedNode } from '../../hooks/useAddParentToSelectedNode';
import { useAddChildToSelectedNode } from '../../hooks/useAddChildToSelectedNode';
import { useAddSpouseToSelectedNode } from '../../hooks/useAddSpouseToSelectedNode';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { nodesUpdatedState } from '../../recoil/nodesUpdatedState';
import { wholeEdgesState } from '../../recoil/WholeEdgesState';

type SelectActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(props => {
  const { isOpen, onClose } = props;
  const selectedNode = useRecoilValue(selectedNodeState);
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);
  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setWholeEdges, () => setNodesUpdated(true));
  const addChildToSelectedNode = useAddChildToSelectedNode(wholeNodes, setWholeNodes, wholeEdges, setWholeEdges, () =>
    setNodesUpdated(true)
  );
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setWholeNodes, setWholeEdges, () => setNodesUpdated(true));

  // 情報を編集
  const displayProfileEditor = () => {
    if (selectedNode) {
      setShowProfileEditor(true);
    }
  };

  const handleCloseModal = () => {
    setShowProfileEditor(false);
    onClose();
  };

  let hasParents = false;
  let hasSpouse = false;
  if (selectedNode) {
    hasParents = !!selectedNode.data.parents.length;
    hasSpouse = !!selectedNode.data.spouse.length;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showProfileEditor ? (
            <ProfileEditor onClose={onClose} setShowProfileEditor={setShowProfileEditor} />
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
                    addParentToSelectedNode();
                    onClose();
                  }}
                >
                  親を追加
                </Button>
                <Button
                  onClick={() => {
                    addChildToSelectedNode();
                    onClose();
                  }}
                >
                  子を追加
                </Button>
                <Button
                  isDisabled={hasSpouse}
                  onClick={() => {
                    addSpouseToSelectedNode();
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
