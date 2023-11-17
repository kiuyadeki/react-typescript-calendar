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
      const SpouseID = getId();
      const SpouseNode: Node = {
        type: 'person',
        id: SpouseID,
        data: {label: `Spouse of ${selectedNode.data.label}`},
        position: {x: selectedNode.position.x + 300, y:selectedNode.position.y}
      };
      setWholeNodes(prevNodes => [...prevNodes, SpouseNode]);
      const NewEdgeId = `edges-${SpouseID}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: SpouseID, sourceHandle: 'husband', targetHandle: 'wife'}]);
    }
  }

  return addSpouseToSelectedNode;
};
