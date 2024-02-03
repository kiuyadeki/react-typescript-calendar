import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { InitialPersonNode } from "../components/parts/InitialPersonNode";
import { getAddedNodeId } from "../utils/getAddedNodeId";
import { createMaritalNode, createPersonNode } from '../utils/nodeUtils';
import { createEdge } from '../utils/edgeUtils';

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData
) => {
  const addSpouseToSelectedNode = () => {
    if (selectedNode) {
      const maritalNode = createMaritalNode(
        { x: selectedNode.position.x + 200, y: selectedNode.position.y }
      );

      const selectedToMaritalEdge = createEdge(
        selectedNode.id, maritalNode.id, 'smoothstep', "personSourceRight", "maritalTargetLeft"
      )

      const SpouseNode= createPersonNode(
        { x: selectedNode.position.x + 400, y: selectedNode.position.y },
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
    }
  };

  return addSpouseToSelectedNode;
};
