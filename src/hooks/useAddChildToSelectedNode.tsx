import { Dispatch, SetStateAction, useMemo } from "react";
import { Edge, Node } from "reactflow";
import useOutgoingEdges from "./useOutgoingEdges";
import { PersonNodeData } from "../types/PersonNodeData";

export const useAddChildToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  wholeEdges: Edge[],
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | PersonNodeData
) => {
  const outgoingEdges = useOutgoingEdges(wholeEdges, selectedNode ? selectedNode : null);

  const addChildToSelectedNode = () => {
    console.log("outgoingEdges", outgoingEdges);

    if (selectedNode) {
      let willAddedNodes: Node[] = [];
      let willAddedEdges: Edge[] = [];
      let maritalNodeId = "";
      const updatedNode = {...selectedNode};

      if (!selectedNode.data.spouse.length) {
        console.log("!selectedNode.data.spouse.length", selectedNode.data.spouse.length);
        const maritalId = getId();
        const maritalNode: Node = {
          type: "marital",
          id: maritalId,
          data: { label: `Marital` },
          position: { x: selectedNode.position.x + 150, y: selectedNode.position.y },
        };

        const selectedToMaritalEdge: Edge = {
          type: "smoothstep",
          id: `edge-${selectedNode.id}-${maritalId}`,
          source: selectedNode.id,
          sourceHandle: "toRight",
          target: maritalId,
          targetHandle: "fromLeft",
        };

        const spouseID = getId();
        const SpouseNode: PersonNodeData = {
          type: "person",
          id: spouseID,
          data: {
            label: `Spouse of ${selectedNode.data.label}`,
            parents: [],
            children: [spouseID + 1],
            spouse: [selectedNode.id],
          },
          position: { x: selectedNode.position.x + 300, y: selectedNode.position.y },
        };

        const spouseToMaritalEdge: Edge = {
          type: "smoothstep",
          id: `edge-${spouseID}-${maritalId}`,
          source: spouseID,
          sourceHandle: "toLeft",
          target: maritalId,
          targetHandle: "fromRight",
        };

        willAddedNodes.push(maritalNode, SpouseNode);
        willAddedEdges.push(selectedToMaritalEdge, spouseToMaritalEdge);
        maritalNodeId = maritalId;
        updatedNode.data.spouse.push(spouseID);

      } else {
        const maritalIdList = outgoingEdges
          .filter(edge => edge.sourceHandle === "toRight" || edge.sourceHandle === "toLeft")
          .map(edge => edge.target);
        maritalNodeId = maritalIdList[0];

      }

      const childId = getId();
      const childNode: PersonNodeData = {
        type: "person",
        id: childId,
        data: {
          label: `Child of ${selectedNode.data.label}`,
          parents: [selectedNode.id],
          children: [],
          spouse: [],
        },
        position: { x: selectedNode.position.x + 150, y: selectedNode.position.y + 300 },
      };
      const maritalToChildEdge: Edge = {
        id: `edge-${maritalNodeId}-${childId}`,
        source: maritalNodeId,
        sourceHandle: "toChild",
        target: childId,
        targetHandle: "fromMarital",
      };

      willAddedNodes.push(childNode);
      willAddedEdges.push(maritalToChildEdge);
      updatedNode.data.children.push(childId);
      setWholeNodes(prevNodes => prevNodes.map(node => {
        return node.id === selectedNode.id ? updatedNode : node;
      }))

      setWholeNodes(prevNodes => [...prevNodes, ...willAddedNodes]);
      const NewEdgeId = `edge-${childId}-${selectedNode.id}`;
      setWholeEdges(prevEdges => [...prevEdges, ...willAddedEdges]);
    }
  };

  return addChildToSelectedNode;
};
