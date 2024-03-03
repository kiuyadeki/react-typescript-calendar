import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import useOutgoingEdges from "./useOutgoingEdges";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { createMaritalNode, createPersonNode } from "../utils/nodeUtils";
import { createEdge } from "../utils/edgeUtils";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from "../utils/constants";

export const useAddChildToSelectedNode = (
  wholeNodes: (PersonNodeData | MaritalNodeData)[],
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | MaritalNodeData)[]>>,
  wholeEdges: Edge[],
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData,
  onUpdated: () => void
) => {
  const outgoingEdges = useOutgoingEdges(wholeEdges, selectedNode);

  const addChildToSelectedNode = () => {
    if (!selectedNode) return;
    let selectedNodeMaritalPosition = selectedNode.data.maritalPosition;
    if (!selectedNodeMaritalPosition) {
      selectedNodeMaritalPosition = 'left';
    }
    let maritalNodeId: MaritalNodeData["id"];
    let spouseID: MaritalNodeData["id"] = selectedNode.data.spouse[0] || "";
    if (!selectedNode.data.spouse.length) {
      const maritalNode = createMaritalNode({
        x: selectedNode.position.x + BASE_MARITAL_SPACING,
        y: selectedNode.position.y,
      });
      maritalNodeId = maritalNode.id;
      const spouseNode = createPersonNode(
        { x: selectedNode.position.x + BASE_MARITAL_SPACING * 2, y: selectedNode.position.y },
        { spouse: [selectedNode.id], maritalNodeId: maritalNodeId, maritalPosition: selectedNodeMaritalPosition === ('left')  ? 'right' : 'left'}
      );
      spouseID = spouseNode.id;
      setWholeNodes(prevNodes => [...prevNodes, maritalNode, spouseNode]);
      setWholeEdges(prevEdges => [
        ...prevEdges,
        createEdge(selectedNode.id, maritalNodeId, "smoothstep", "personSourceRight", "maritalTargetLeft"),
        createEdge(spouseID, maritalNodeId, "smoothstep", "personSourceLeft", "maritalTargetRight"),
      ]);
    } else {
      maritalNodeId =
        outgoingEdges.find(
          edge => edge.sourceHandle === "personSourceRight" || edge.sourceHandle === "personSourceLeft"
        )?.target || "";
    }

    const childNode = createPersonNode(
      { x: selectedNode.position.x + BASE_MARITAL_SPACING, y: selectedNode.position.y + BASE_GENERATIONS_SPACING },
      { parents: [selectedNode.id, spouseID], siblings: [...selectedNode.data.children] }
    );
    childNode.data.siblings?.push(childNode.id);

    setWholeNodes(prevNodes =>
      prevNodes
        .map(node => {
          if (node.id === spouseID && node.type === "person") {
            return { ...node, data: { ...node.data, children: [...node.data.children, childNode.id] } };
          } else if (node.id === selectedNode.id && node.type === "person") {
            return {
              ...node,
              data: {
                ...node.data,
                spouse: [...node.data.spouse, spouseID],
                children: [...node.data.children, childNode.id],
                maritalNodeId: maritalNodeId,
                maritalPosition: selectedNodeMaritalPosition,
              },
            };
          } else if (selectedNode.data.children.includes(node.id) && node.type === "person") {
            return { ...node, data: { ...node.data, siblings: [...selectedNode.data.children, childNode.id] } };
          }
          return node;
        })
        .concat([childNode])
    );

    setWholeEdges(prevEdges => [
      ...prevEdges,
      createEdge(childNode.id, maritalNodeId, "smoothstep", "personSourceTop", "maritalTargetBottom"),
    ]);
    if (onUpdated) {
      onUpdated();
    }
  };

  return addChildToSelectedNode;
};
