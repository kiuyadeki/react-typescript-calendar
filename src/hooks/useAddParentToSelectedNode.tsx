import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { InitialPersonNode } from "../components/parts/InitialPersonNode";
import { useGetAddedNodeId } from "./useGetAddedNodeId";

export const useAddParentToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData
) => {
  const getAddedNodeId = useGetAddedNodeId();
  const addParentToSelectedNode = () => {
    if (selectedNode) {
      const maritalId = getAddedNodeId();
      const maritalNode: maritalNodeData = {
        type: "marital",
        id: maritalId,
        data: { isDivorced: false },
        position: { x: selectedNode.position.x, y: selectedNode.position.y - 100 },
      };

      const maritalToChildEdge: Edge = {
        type: "smoothstep",
        id: `edge-${maritalId}-${selectedNode.id}`,
        source: maritalId,
        sourceHandle: "toChild",
        target: selectedNode.id,
        targetHandle: "fromMarital",
      };

      const leftParentId = getAddedNodeId();
      const leftParentNode: PersonNodeData = {
        ...InitialPersonNode,
        id: leftParentId,
        data: {
          ...InitialPersonNode.data,
          label: leftParentId,
          children: [selectedNode.id],
          spouse: [String(parseInt(leftParentId) + 1)],
        },
        position: { x: selectedNode.position.x - 300, y: selectedNode.position.y - 100 },
      };

      const leftParentToMaritalEdge: Edge = {
        id: `edge-${leftParentId}-${maritalId}`,
        source: leftParentId,
        sourceHandle: "toRight",
        target: maritalId,
        targetHandle: "fromLeft",
      };

      const rightParentId = getAddedNodeId();
      const rightParentNode: PersonNodeData = {
        ...InitialPersonNode,
        id: rightParentId,
        data: {
          ...InitialPersonNode.data,
          label: rightParentId,
          children: [selectedNode.id],
          spouse: [leftParentId],
        },
        position: { x: selectedNode.position.x + 300, y: selectedNode.position.y - 100 },
      };

      const RightParentToMaritalEdge: Edge = {
        id: `edge-${rightParentId}-${maritalId}`,
        source: rightParentId,
        sourceHandle: "toLeft",
        target: maritalId,
        targetHandle: "fromRight",
      };

      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          parents: [leftParentId, rightParentId],
        },
      };
      setWholeNodes(prevNodes =>
        prevNodes.map(node => {
          return node.id === selectedNode.id ? updatedNode : node;
        })
      );

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, leftParentNode, rightParentNode]);
      setWholeEdges(prevEdges => [...prevEdges, maritalToChildEdge, leftParentToMaritalEdge, RightParentToMaritalEdge]);
    }
  };

  return addParentToSelectedNode;
};
