import { useDisclosure } from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { SelectActionModal } from "../parts/SelectActionModal";
import { FamilyTreeWrapper } from './FamilyTreeWrapper';
import Modal from "react-modal";

const AddNodeOnEdgeDrop = () => {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <FamilyTreeWrapper openModal={openModal} />
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.48)',
            zIndex: 1400,
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            outline: 'transparent solid 2px',
            outlineOffset: '2px',
            borderRadius: '0.375rem',
            marginTop: '4rem',
            marginBottom: '4rem',
            zIndex: '1400',
            backgroundColor: '#fff',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            maxWidth: '28rem',
            padding: '0.75rem',
          }
        }}
        shouldCloseOnOverlayClick={true}
        >
      <SelectActionModal
        closeModal={closeModal}
      />
      </Modal>
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
