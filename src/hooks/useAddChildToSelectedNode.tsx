import { Dispatch, SetStateAction, useMemo } from "react";
import { Edge, Node } from "reactflow";
import useOutgoingEdges from "./useOutgoingEdges";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export const useAddChildToSelectedNode = (
  wholeNodes: (PersonNodeData | maritalNodeData)[],
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  wholeEdges: Edge[],
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | PersonNodeData
) => {
  const outgoingEdges = useOutgoingEdges(wholeEdges, selectedNode ? selectedNode : null);

  const addChildToSelectedNode = () => {

    if (selectedNode) {
      let willAddedNodes: (PersonNodeData | maritalNodeData)[] = [];
      let willAddedEdges: Edge[] = [];
      let maritalNodeId = "";
      const updatedNode = {...selectedNode};
      let spouseId:number | null | string = null;

      if (!selectedNode.data.spouse.length) {
        const maritalId = getId();
        const maritalNode: maritalNodeData = {
          type: "marital",
          id: maritalId,
          data: { isDivorced: false},
          position: { x: selectedNode.position.x + 200, y: selectedNode.position.y },
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
            children: [parseInt(spouseID) + 1],
            spouse: [selectedNode.id],
          },
          position: { x: selectedNode.position.x + 400, y: selectedNode.position.y },
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

        if (typeof updatedNode.data.spouse[0] === 'string') {
          spouseId = parseInt(updatedNode.data.spouse[0]);
        }
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
        position: { x: selectedNode.position.x + 200, y: selectedNode.position.y + 300 },
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
        if (parseInt(node.id) === spouseId && node.type === "person") {
          console.log(node.type);
          const updatedSpouseNode = {...node};
          updatedSpouseNode.data.children.push(childId);
          return updatedSpouseNode;
        } else if (node.id === selectedNode.id) {
          return updatedNode;
        }
        return node;
      }));

      setWholeNodes(prevNodes => [...prevNodes, ...willAddedNodes]);
      setWholeEdges(prevEdges => [...prevEdges, ...willAddedEdges]);
    }
  };

  return addChildToSelectedNode;
};
