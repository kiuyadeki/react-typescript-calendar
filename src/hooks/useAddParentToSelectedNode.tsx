import { Dispatch, SetStateAction } from "react";
import { Edge } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { createMaritalNode, createPersonNode } from "../utils/nodeUtils";
import { createEdge } from "../utils/edgeUtils";

export const useAddParentToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData
) => {
  const addParentToSelectedNode = () => {
    if (!selectedNode) return;

    const maritalNode = createMaritalNode({ x: selectedNode.position.x, y: selectedNode.position.y - 100 });
    const leftParentNode = createPersonNode(
      { x: selectedNode.position.x - 300, y: selectedNode.position.y - 100 },
      { children: [selectedNode.id] }
    );
    const rightParentNode = createPersonNode(
      { x: selectedNode.position.x + 300, y: selectedNode.position.y - 100 },
      { children: [selectedNode.id], spouse: [leftParentNode.id] }
    );
    leftParentNode.data.spouse.push(rightParentNode.id);

    const edgesToAdd = [
      createEdge(selectedNode.id, maritalNode.id, "smoothstep", "personSourceTop", "maritalTargetBottom"),
      createEdge(leftParentNode.id, maritalNode.id, "smoothstep", "personSourceRight", "maritalTargetLeft"),
      createEdge(rightParentNode.id, maritalNode.id, "smoothstep", "personSourceLeft", "maritalTargetRight"),
    ];

    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        parents: [leftParentNode.id, rightParentNode.id],
      },
    };

    setWholeNodes(prevNodes =>
      prevNodes
        .map(node => (node.id === selectedNode.id ? updatedNode : node))
        .concat([maritalNode, leftParentNode, rightParentNode])
    );
    setWholeEdges(prevEdges => [...prevEdges, ...edgesToAdd]);
  };

  return addParentToSelectedNode;
};
