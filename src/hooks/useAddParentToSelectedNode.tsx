import { Dispatch, SetStateAction } from 'react';
import { Edge, Node } from 'reactflow';
import { PersonNodeData } from '../types/PersonNodeData';

export const useAddParentToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
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

      const maritalToChildEdge: Edge = {
        id: `edge-${maritalId}-${selectedNode.id}`,
        source: maritalId,
        sourceHandle: 'toChild',
        target: selectedNode.id,
        targetHandle: 'fromMarital',
        type: 'smoothstep',
      }

      const leftParentId = getId();
      const leftParentNode: PersonNodeData = {
        type: 'person',
        id: leftParentId,
        data: { 
          label: `Parent of ${selectedNode.data.label}`, 
          parents: [],
          children: [selectedNode.id], 
          spouse: [leftParentId + 1]},
        position: { x: selectedNode.position.x - 300, y: selectedNode.position.y - 100},
      };

      const leftParentToMaritalEdge: Edge = {
        id: `edge-${leftParentId}-${maritalId}`,
        source: leftParentId,
        sourceHandle: 'toRight',
        target: maritalId,
        targetHandle: 'fromLeft',
      }

      const rightParentId = getId();
      const rightParentNode: PersonNodeData = {
        type: 'person',
        id: rightParentId,
        data: { 
          label: `Parent of ${selectedNode.data.label}`, 
          parents: [],
          children: [selectedNode.id], 
          spouse: [leftParentId]
        },
        position: { x: selectedNode.position.x + 300, y: selectedNode.position.y - 100},
      };
      
      const RightParentToMaritalEdge: Edge = {
        id: `edge-${rightParentId}-${maritalId}`,
        source: rightParentId,
        sourceHandle: 'toLeft',
        target: maritalId,
        targetHandle: 'fromRight',
      }

      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          parents: [leftParentId, rightParentId],
        }
      }
      setWholeNodes(prevNodes => prevNodes.map(node => {
        return node.id === selectedNode.id ? updatedNode : node;
      }));

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, leftParentNode, rightParentNode]);
      setWholeEdges(prevEdges => [...prevEdges, maritalToChildEdge, leftParentToMaritalEdge, RightParentToMaritalEdge]);
    }
  }

  return addParentToSelectedNode;
}