import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";

export const useAddChildToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | Node
) => {
  const addChildToSelectedNode = () => {
    if (selectedNode) {
      const childId = getId();
      const childNode: Node = {
        type: "person",
        id: childId,
        data: { label: `Child of ${selectedNode.data.label}` },
        position: { x: selectedNode.position.x, y: selectedNode.position.y + 100 },
      };
      setWholeNodes(prevNodes => [...prevNodes, childNode]);
      const NewEdgeId = `edge-${childId}-${selectedNode.id}`;
      setEdges(prevEdges => [
        ...prevEdges,
        { id: NewEdgeId, source: selectedNode.id, target: childId, sourceHandle: "parent", targetHandle: "child" },
      ]);
    }
  };

  return addChildToSelectedNode;
};
