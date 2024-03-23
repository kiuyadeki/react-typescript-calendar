import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import useOutgoingEdges from "./useOutgoingEdges";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { createMaritalNode, createPersonNode } from "../utils/nodeUtils";
import { createEdge } from "../utils/edgeUtils";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING } from "../utils/constants";
import { isPersonNodeData } from "../typeGuards/personTypeGuards";

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
      selectedNodeMaritalPosition = "left";
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
        {
          spouse: [selectedNode.id],
          maritalNodeId: maritalNodeId,
          maritalPosition: selectedNodeMaritalPosition === "left" ? "right" : "left",
        }
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

    const updateChildren = (node: PersonNodeData, childId: string): PersonNodeData => ({
      ...node,
      data: { ...node.data, children: [...node.data.children, childId] },
    });

    const updateSpouseAndChildren = (
      node: PersonNodeData,
      spouseId: string,
      childId: string,
      maritalNodeId: string,
      maritalPosition: "left" | "right" | null
    ): PersonNodeData => ({
      ...node,
      data: {
        ...node.data,
        spouse: [...node.data.spouse, spouseId],
        children: [...node.data.children, childId],
        maritalNodeId,
        maritalPosition,
      },
    });

    const updateSiblings = (node: PersonNodeData, siblings: string[], childId: string): PersonNodeData => ({
      ...node,
      data: { ...node.data, siblings: [...siblings, childId] },
    });

    setWholeNodes(prevNodes =>
      prevNodes
        .map(node => {
          if (isPersonNodeData(node)) {
            if (node.id == spouseID) {
              return updateChildren(node, childNode.id);
            } else if (node.id === selectedNode.id) {
              return updateSpouseAndChildren(node, spouseID, childNode.id, maritalNodeId, selectedNodeMaritalPosition);
            } else if (selectedNode.data.children.includes(node.id)) {
              return updateSiblings(node, selectedNode.data.children, childNode.id);
            }
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
  
  // const addChildToSelectedNode = () => {
  //   if (!selectedNode) return;
  //   const maritalDetails = ensureMaritalSetup(selectedNode, outgoingEdges);
  //   const childNode = createChildNode(selectedNode, maritalDetails.spouseID, maritalDetails.maritalNodeId);
  //   updateNodesAndEdges(maritalDetails, childNode);
  //   if (onUpdated) onUpdated();
  // };

  // const ensureMaritalSetup = (selectedNode: PersonNodeData, outgoingEdges: Edge[]) => {  
  //   let maritalNodeId: string;
  //   let spouseID = selectedNode.data.spouse[0] || "";
  //   const selectedNodeMaritalPosition = selectedNode.data.maritalPosition || "left";

  //   if(!spouseID) {
  //     const { maritalNode, spouseNode } = createMaritalAndSpouseNodes(selectedNode, selectedNodeMaritalPosition);
  //     maritalNodeId = maritalNode.id;
  //     spouseID = spouseNode.id;
  //     addNewNodesAndEdges(maritalNode, spouseNode, selectedNode);
  //   } else {
  //     maritalNodeId = findMaritalNodeId(outgoingEdges);
  //   }

  //   return { maritalNodeId, spouseID, selectedNodeMaritalPosition};
  // }

  // const createMaritalAndSpouseNodes = (selectedNode: PersonNodeData, maritalPosition: string) => {
  //   const maritalNode = createMaritalNode({
  //     x: selectedNode.position.x + BASE_MARITAL_SPACING,
  //     y: selectedNode.position.y,
  //   });

  //   const spouseNode = createPersonNode(
  //     { x: selectedNode.position.x + BASE_MARITAL_SPACING * 2, y: selectedNode.position.y },
  //     {
  //       spouse: [selectedNode.id],
  //       maritalNodeId: maritalNode.id,
  //       maritalPosition: maritalPosition === "left" ? "right" : "left",
  //     }
  //   );

  //   return { maritalNode, spouseNode };
  // }

  // const findMaritalNodeId = (outgoingEdges: Edge[]) => {
  //   return outgoingEdges.find(edge => edge.sourceHandle === "personSourceRight" || edge.sourceHandle === "personSourceLeft")?.target || "";
  // }

  // const createChildNode = (selectedNode: PersonNodeData, spouseID: string, maritalNodeId: string) => {
  //   return createPersonNode(
  //     { x: selectedNode.position.x + BASE_MARITAL_SPACING, y: selectedNode.position.y + BASE_GENERATIONS_SPACING },
  //     { parents: [selectedNode.id, spouseID], siblings: [...selectedNode.data.children] }
  //   );
  // }

  // const addNewNodesAndEdges = (maritalNode: MaritalNodeData, spouseNode: PersonNodeData, selectedNode: PersonNodeData) => {
  //   setWholeNodes(prevNodes => [...prevNodes, maritalNode, spouseNode]);
  //   setWholeEdges(prevEdges => [
  //     ...prevEdges,
  //     createEdge(selectedNode.id, maritalNode.id, "smoothstep", "personSourceRight", "maritalTargetLeft"),
  //     createEdge(spouseNode.id, maritalNode.id, "smoothstep", "personSourceLeft", "maritalTargetRight"),
  //   ]);
  // }

  // const updateNodesAndEdges = (details: { maritalNodeId: string; spouseID: string; selectedNodeMaritalPosition: "left" | "right" | null }, childNode: PersonNodeData) => {
  //   setWholeNodes(prevNodes =>
  //     prevNodes.map(node => {
  //       if (isPersonNodeData(node)) {
  //         if (node.id === details.spouseID) {
  //           return updateChildren(node, childNode.id);
  //         } else if (node.id === selectedNode?.id) {
  //           return updateSpouseAndChildren(node, details.spouseID, childNode.id, details.maritalNodeId, details.selectedNodeMaritalPosition);
  //         } else if (selectedNode && selectedNode.data.children.includes(node.id)) {
  //           return updateSiblings(node, selectedNode.data.children, childNode.id);
  //         }
  //       }
  //       return node;
  //     }).concat([childNode])
  //   );
  
  //   setWholeEdges(prevEdges => [
  //     ...prevEdges,
  //     createEdge(childNode.id, details.maritalNodeId, "smoothstep", "personSourceTop", "maritalTargetBottom"),
  //   ]);
  // };
  
  // const updateChildren = (node: PersonNodeData, childId: string): PersonNodeData => ({
  //   ...node,
  //   data: { ...node.data, children: [...node.data.children, childId] },
  // });
  
  // const updateSpouseAndChildren = (
  //   node: PersonNodeData,
  //   spouseId: string,
  //   childId: string,
  //   maritalNodeId: string,
  //   maritalPosition: "left" | "right" | null
  // ): PersonNodeData => ({
  //   ...node,
  //   data: {
  //     ...node.data,
  //     spouse: [...node.data.spouse, spouseId],
  //     children: [...node.data.children, childId],
  //     maritalNodeId,
  //     maritalPosition,
  //   },
  // });
  
  // const updateSiblings = (node: PersonNodeData, siblings: string[], childId: string): PersonNodeData => ({
  //   ...node,
  //   data: { ...node.data, siblings: [...siblings, childId] },
  // });

  return addChildToSelectedNode;
};
