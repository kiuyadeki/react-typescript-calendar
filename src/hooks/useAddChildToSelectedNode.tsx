import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import useOutgoingEdges from "./useOutgoingEdges";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { createMaritalNode, createPersonNode } from "../utils/nodeUtils";
import { createEdge } from "../utils/edgeUtils";

export const useAddChildToSelectedNode = (
  wholeNodes: (PersonNodeData | maritalNodeData)[],
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  wholeEdges: Edge[],
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData
) => {
  const outgoingEdges = useOutgoingEdges(wholeEdges, selectedNode);

  const addChildToSelectedNode = () => {
    if (!selectedNode) return;

    let maritalNodeId: maritalNodeData["id"];
    let spouseID: maritalNodeData["id"] = selectedNode.data.spouse[0] || "";

    if (!selectedNode.data.spouse.length) {
      const maritalNode = createMaritalNode({ x: selectedNode.position.x + 200, y: selectedNode.position.y });
      maritalNodeId = maritalNode.id;

      const spouseNode = createPersonNode(
        { x: selectedNode.position.x + 400, y: selectedNode.position.y },
        { spouse: [selectedNode.id] , maritalNodeId: maritalNodeId}
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
        outgoingEdges.find(edge => edge.sourceHandle === "personSourceRight" || edge.sourceHandle === "personSourceLeft")?.target || "";
    }

    const childNode = createPersonNode(
      { x: selectedNode.position.x + 200, y: selectedNode.position.y + 300 },
      { parents: [selectedNode.id, spouseID], siblings: [selectedNode.data.children] }
    );

    setWholeNodes(prevNodes =>
      prevNodes
        .map(node => {
          if (node.id === spouseID && node.type === "person") {
            return { ...node, data: { ...node.data, children: [...node.data.children, childNode.id] } };
          } else if (node.id === selectedNode.id && node.type === "person") {
            return { ...node, data: { ...node.data, spouse: [...node.data.spouse, spouseID], children: [...node.data.children, childNode.id] } };
          } else if (selectedNode.data.children.includes(node.id) && node.type === "person") {
            return { ...node, data: { ...node.data, siblings: [...selectedNode.data.children]}}
          }
          return node;
        })
        .concat([childNode])
    );

    setWholeEdges(prevEdges => [
      ...prevEdges,
      createEdge(childNode.id, maritalNodeId, "smoothstep", "personSourceTop", "maritalTargetBottom"),
    ]);
  };

  return addChildToSelectedNode;
};
