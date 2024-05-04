import {
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from "react";
import { ProfileEditor } from "./ProfileEditor";
import { PersonNodeData } from "../../types/PersonNodeData";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedNodeState } from "../../recoil/selectedNodeState";
import { useAddParentToSelectedNode } from "../../hooks/useAddParentToSelectedNode";
import { useAddChildToSelectedNode } from "../../hooks/useAddChildToSelectedNode";
import { useAddSpouseToSelectedNode } from "../../hooks/useAddSpouseToSelectedNode";
import { wholeNodesState } from "../../recoil/WholeNodesState";
import { nodesUpdatedState } from "../../recoil/nodesUpdatedState";
import { wholeEdgesState } from "../../recoil/WholeEdgesState";
import styled from "@emotion/styled";

type SelectActionModalProps = {
  closeModal: () => void;
};

export const SelectActionModal: FC<SelectActionModalProps> = memo(props => {
  const { closeModal } = props;
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
    closeModal();
  };

  let hasParents = false;
  let hasSpouse = false;
  if (selectedNode) {
    hasParents = !!selectedNode.data.parents.length;
    hasSpouse = !!selectedNode.data.spouse.length;
  }


  const ModalBox = styled.section`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border-radius: 0.375rem;
    color: inherit;
    margin-top: 4rem;
    margin-bottom: 4rem;
    z-index: 1400;
    background-color: #fff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    max-width: 28rem;
    padding: 0.75rem;
  `;

  const ModalHeader = styled.header`
    flex: 0 1 0%;
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  `;

  const ModalBody = styled.div`
    padding-inline-start: 1.5rem;
    padding-inline-end: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex: 1 1 0%;
  `;

  return (
        <>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            {showProfileEditor ? (
              <ProfileEditor onClose={closeModal} setShowProfileEditor={setShowProfileEditor} />
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
                      closeModal();
                    }}
                  >
                    親を追加
                  </Button>
                  <Button
                    onClick={() => {
                      addChildToSelectedNode();
                      closeModal();
                    }}
                  >
                    子を追加
                  </Button>
                  <Button
                    isDisabled={hasSpouse}
                    onClick={() => {
                      addSpouseToSelectedNode();
                      closeModal();
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
        </>
  );
});
