import { Box, useDisclosure } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  ConnectionMode,
  ConnectionStatus,
  Controls,
  Edge,
  HandleType,
  MiniMap,
  Node,
  NodeChange,
  OnConnectEnd,
  OnConnectStart,
  ReactFlowProvider,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useReactFlow,
  useViewport,
} from "reactflow";
import "reactflow/dist/style.css";
import { SelectActionModal } from "../parts/SelectActionModal";
import { personNode } from "../parts/CustomNode";
import { useRecoilState, useRecoilValue } from "recoil";
import { wholeNodesState } from "../../recoil/WholeNodesState";
import { useAddParentToSelectedNode } from "../../hooks/useAddParentToSelectedNode";
import { useAddChildToSelectedNode } from "../../hooks/useAddChildToSelectedNode";
import { useAddSpouseToSelectedNode } from "../../hooks/useAddSpouseToSelectedNode";
import { maritalNode } from "../parts/MaritalStatusNode";
import { wholeEdgesState } from "../../recoil/WholeEdgesState";
import { MaritalNodeData, PersonNodeData } from "../../types/PersonNodeData";
import { calculateNodesPosition } from "../../utils/calculateNodesPosition";
import { filterDirectLineagesNodes } from "../../utils/filterDirectLineageNodes";
import { AnimatePresence } from "framer-motion";
import { isPersonNodeData } from "../../typeGuards/personTypeGuards";
import { nodesUpdatedState } from "../../recoil/nodesUpdatedState";
import { selectedNodeState } from "../../recoil/selectedNodeState";

const AddNodeOnEdgeDrop = () => {
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const [wholeEdges, setWholeEdges] = useRecoilState(wholeEdgesState);
  const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeState);
  const [showProfileEditor, setShowProfileEditor] = useState<boolean>(false);
  const [nodesUpdated, setNodesUpdated] = useRecoilState(nodesUpdatedState);

  // react flow
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const nodeTypes = useMemo(() => ({ person: personNode, marital: maritalNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(wholeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(wholeEdges as Edge[]);
  const onConnect = useCallback((params: Connection) => setEdges(eds => addEdge(params, eds)), []);
  const { setCenter } = useReactFlow();

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleNodeClick = (clickedNode: PersonNodeData) => {
    const previousSelectedNode = selectedNode;
    setSelectedNode(clickedNode);
    if (selectedNode && clickedNode.id === selectedNode.id) {
      onOpen();
    } else {
      setWholeNodes(prevNodes =>
        prevNodes.map(node => {
          if (!isPersonNodeData(node)) return node;
          if (previousSelectedNode && node.id === previousSelectedNode.id) {
            return { ...node, data: { ...node.data, selected: false } };
          } else if (node.id === clickedNode.id) {
            return { ...node, data: { ...node.data, selected: true } };
          } else {
            return node;
          }
        })
      );
      setNodesUpdated(true);
    }
  };
  const handleCloseModal = () => {
    setShowProfileEditor(false);
    onClose();
  };

  const { x, y, zoom } = useViewport();
  const reactFlowInstance = useReactFlow();
  
  useEffect(() => {
    reactFlowInstance.fitView({
      padding: 20,
    });
  }, [reactFlowInstance]);
  
  useEffect(() => {
    if (nodesUpdated && selectedNode) {
      const { directLineageNodes, directLineageEdges } = filterDirectLineagesNodes(wholeNodes, wholeEdges, selectedNode);
      const calculatedWholeNodes = calculateNodesPosition(directLineageNodes, selectedNode, nodesUpdated);
      if (!calculatedWholeNodes) return;
      setNodes(calculatedWholeNodes);
      setEdges(directLineageEdges);
      setNodesUpdated(false);
      setCenter(selectedNode?.position.x, selectedNode?.position.y, { zoom, duration: 1000 });
    }
  }, [nodesUpdated]);

  const addParentToSelectedNode = useAddParentToSelectedNode(setWholeNodes, setWholeEdges, () => setNodesUpdated(true));
  const addChildToSelectedNode = useAddChildToSelectedNode(wholeNodes, setWholeNodes, wholeEdges, setWholeEdges, () =>
    setNodesUpdated(true)
  );
  const addSpouseToSelectedNode = useAddSpouseToSelectedNode(setWholeNodes, setWholeEdges, () => setNodesUpdated(true));

  return (
    <>
      <Box w="100vw" h="100vh" className="wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(e, node) => {
            if (isPersonNodeData(node)) {
              handleNodeClick(node);
            }
          }}
          nodesDraggable={false}
          fitView
          fitViewOptions={{ padding: 10 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#ddd" variant={BackgroundVariant.Lines} gap={[340, 250]} />
        </ReactFlow>
      </Box>
      <SelectActionModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        showProfileEditor={showProfileEditor}
        setShowProfileEditor={setShowProfileEditor}
        addParent={addParentToSelectedNode}
        addChild={addChildToSelectedNode}
        addSpouse={addSpouseToSelectedNode}
        onUpdated={() => setNodesUpdated(true)}
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
