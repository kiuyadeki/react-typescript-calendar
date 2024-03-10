import { useMemo } from 'react';
import { Edge } from 'reactflow';
import { PersonNodeData } from '../types/PersonNodeData';

function useOutgoingEdges(wholeEdges: Edge[], selectedNode: PersonNodeData | null) {
  const outgoingEdges = useMemo(() => {
    if (selectedNode) {
      return wholeEdges.filter(e => e.source === selectedNode.id);
    } else {
      return [];
    }
  }, [wholeEdges, selectedNode]);
  return outgoingEdges;
}

export default useOutgoingEdges;