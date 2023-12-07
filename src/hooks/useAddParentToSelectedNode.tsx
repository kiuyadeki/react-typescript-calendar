import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'reactflow';

export const useAddParentToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | Node,
  ) => {
  const addParentToSelectedNode = () => {
    if(selectedNode) {
      const maritalId = getId();
      const maritalNode: Node = {
        type: 'marital',
        id: maritalId,
        data: { label: `Marital`},
        position: {x: selectedNode.position.x + 95, y: selectedNode.position.y - 100},
      }

      const childToMaritalEdge: Edge = {
        id: `edge-${selectedNode.id}-${maritalId}`,
        source: selectedNode.id,
        sourceHandle: 'toMarital',
        target: maritalId,
        targetHandle: 'fromChild',
        type: 'smoothstep',
      }

      const leftParentId = getId();
      const leftParentNode: Node = {
        type: 'person',
        id: leftParentId,
        data: { label: `Parent of ${selectedNode.data.label}`, children: [selectedNode.id], spouse: [leftParentId + 1]},
        position: { x: selectedNode.position.x - 300, y: selectedNode.position.y - 100},
      };
      const maritalToLeftParentEdge: Edge = {
        id: `edge-${maritalId}-${leftParentId}`,
        source: maritalId,
        sourceHandle: 'toLeft',
        target: leftParentId,
        targetHandle: 'fromRight',
      }

      const rightParentId = getId();
      const rightParentNode: Node = {
        type: 'person',
        id: rightParentId,
        data: { label: `Parent of ${selectedNode.data.label}`, children: [selectedNode.id], spouse: [leftParentId]},
        position: { x: selectedNode.position.x + 300, y: selectedNode.position.y - 100},
      };
      const maritalToRightParentEdge: Edge = {
        id: `edge-${maritalId}-${rightParentId}`,
        source: maritalId,
        sourceHandle: 'toRight',
        target: rightParentId,
        targetHandle: 'fromLeft',
      }

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, leftParentNode, rightParentNode]);
      setEdges(prevEdges => [...prevEdges, childToMaritalEdge, maritalToLeftParentEdge, maritalToRightParentEdge]);
    }
  }

  return addParentToSelectedNode;
}