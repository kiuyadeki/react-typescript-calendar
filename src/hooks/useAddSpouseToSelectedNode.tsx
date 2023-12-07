import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | Node
) => {
  const addSpouseToSelectedNode = () => {
    if(selectedNode) {
      const maritalId = getId();
      const maritalNode: Node = {
        type: 'marital',
        id: maritalId,
        data: { label: `Marital`},
        position: {x: selectedNode.position.x + 150, y: selectedNode.position.y},
      }

      const selectedToMaritalEdge: Edge = {
        id: `edge-${selectedNode.id}-${maritalId}`,
        source: selectedNode.id,
        sourceHandle: 'toMarital',
        target: maritalId,
        targetHandle: 'fromChild',
        type: 'smoothstep',
      }

      const SpouseID = getId();
      const SpouseNode: Node = {
        type: 'person',
        id: SpouseID,
        data: {label: `Spouse of ${selectedNode.data.label}`},
        position: {x: selectedNode.position.x + 300, y:selectedNode.position.y}
      };
      setWholeNodes(prevNodes => [...prevNodes, SpouseNode]);
      const NewEdgeId = `edges-${SpouseID}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: SpouseID, sourceHandle: 'toRight', targetHandle: 'fromLeft'}]);
    }
  }

  return addSpouseToSelectedNode;
};
