import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Node } from 'reactflow';

export const useShiftNodes = (
  initialNodes: Node[],
  setWholeNodes: Dispatch<SetStateAction<Node[]>>, ) => {

  const shiftNodes = useCallback((selectedNode: null | Node, dx: number, dy: number) => {
    setWholeNodes((currentNodes) => {
      if(!selectedNode) return [...currentNodes];
      const shiftedNodes = currentNodes.map(node => {
        if(node.position.x > selectedNode.position.x) {
          return {
            ...node,
            position: {
              x: node.position.x + dx,
              y: node.position.y + dy,
            }
          }
        }
        return node;
      });
      return shiftedNodes;
    });
  }, [setWholeNodes]);

  return shiftNodes;
}