import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'reactflow';

export const useAddParentToSelectedNode = (
  setNodes: Dispatch<SetStateAction<Node[]>>, 
  setEdges: Dispatch<SetStateAction<Edge[]>>, 
  getId: () => string,
  selectedNode: null | Node,
  ) => {
  const addParentToSelectedNode = () => {
    if(selectedNode) {
      const parentId = getId();
      const parentNode: Node = {
        type: 'person',
        id: parentId,
        data: { label: `Parent of ${selectedNode.data.label}`},
        position: { x: selectedNode.position.x, y: selectedNode.position.y - 100},
      };
      setNodes(prevNodes => [...prevNodes, parentNode]);
      const newEdgeId = `edge-${parentId}-${selectedNode.id}`;
      setEdges(prevEdges => [...prevEdges, { id: newEdgeId, source: parentId, target: selectedNode.id, sourceHandle: 'parent', targetHandle: 'child' }]);
    }
  }

  return addParentToSelectedNode;
}