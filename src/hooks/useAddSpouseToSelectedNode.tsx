import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { InitialPersonNode } from "../components/parts/InitialPersonNode";
import { useGetAddedNodeId } from "./useGetAddedNodeId";

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  selectedNode: null | PersonNodeData
) => {
  const getAddedNodeId = useGetAddedNodeId();
  const addSpouseToSelectedNode = () => {
    if (selectedNode) {
      const maritalId = getAddedNodeId();
      const maritalNode: maritalNodeData = {
        type: "marital",
        id: maritalId,
        data: { isDivorced: false },
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

      const spouseID = getAddedNodeId();
      const SpouseNode: PersonNodeData = {
        ...InitialPersonNode,
        id: spouseID,
        data: {
          ...InitialPersonNode.data,
          label: spouseID,
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

      let updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          spouse: [spouseID],
        },
      };

      setWholeNodes(prevNodes =>
        prevNodes.map(node => {
          return node.id === selectedNode.id ? updatedNode : node;
        })
      );

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, SpouseNode]);
      const NewEdgeId = `edges-${spouseID}-${selectedNode.id}`;
      // setWholeEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: spouseID, sourceHandle: 'toRight', targetHandle: 'fromLeft'}]);
      setWholeEdges(prevEdges => [...prevEdges, selectedToMaritalEdge, spouseToMaritalEdge]);
    }
  };

  return addSpouseToSelectedNode;
};
