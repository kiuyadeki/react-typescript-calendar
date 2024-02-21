import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { InitialPersonNode } from "../components/parts/InitialPersonNode";
import { getAddedNodeId } from "../utils/getAddedNodeId";
import { createMaritalNode, createPersonNode } from "../utils/nodeUtils";
import { createEdge } from "../utils/edgeUtils";
import { BASE_MARITAL_SPACING } from "../utils/constants";

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | MaritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData,
  onUpdated: () => void
) => {
  const addSpouseToSelectedNode = () => {
    if (selectedNode) {
      const maritalNode = createMaritalNode({
        x: selectedNode.position.x + BASE_MARITAL_SPACING,
        y: selectedNode.position.y,
      });

      const selectedToMaritalEdge = createEdge(
        selectedNode.id,
        maritalNode.id,
        "smoothstep",
        "personSourceRight",
        "maritalTargetLeft"
      );

      const SpouseNode = createPersonNode(
        { x: selectedNode.position.x + BASE_MARITAL_SPACING * 2, y: selectedNode.position.y },
        {
          spouse: [selectedNode.id],
          maritalNodeId: maritalNode.id,
        }
      );

      const spouseToMaritalEdge = createEdge(
        SpouseNode.id,
        maritalNode.id,
        "smoothstep",
        "personSourceLeft",
        "maritalTargetRight"
      );

      let updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          spouse: [SpouseNode.id],
          maritalNodeId: maritalNode.id,
        },
      };

      setWholeNodes(prevNodes =>
        prevNodes.map(node => {
          return node.id === selectedNode.id ? updatedNode : node;
        })
      );

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, SpouseNode]);
      const NewEdgeId = `edges-${SpouseNode.id}-${selectedNode.id}`;
      setWholeEdges(prevEdges => [...prevEdges, selectedToMaritalEdge, spouseToMaritalEdge]);
      if (onUpdated) {
        onUpdated();
      }
    }
  };

  return addSpouseToSelectedNode;
};
