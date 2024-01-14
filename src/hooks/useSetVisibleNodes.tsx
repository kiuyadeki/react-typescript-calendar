import { useMemo } from 'react';
import { PersonNodeData, maritalNodeData } from '../types/PersonNodeData';
import { Edge } from 'reactflow';

export function useDirectLineage(wholeNodes: (PersonNodeData | maritalNodeData)[], wholeEdges: Edge[], selectedNode: PersonNodeData | null) {
  const { directLineageNodes, directLineageEdges } = useMemo(() => {
    const selectedNodeId = selectedNode?.id;
    if (!selectedNode || selectedNode.type !== 'person') return { directLineageNodes: [], directLineageEdges: [] };

    let lineageNodes: (PersonNodeData | maritalNodeData)[] = [selectedNode];
    let lineageEdges: Edge[] = [];

    const findRelatedNodesAndEdges = (nodeId: string, nodes: (PersonNodeData | maritalNodeData)[], edges: any[], processedNodes: Set<string>) => {
      if (processedNodes.has(nodeId)) {
        // 既に処理されたノードはスキップ
        return;
      }
    
      const node = wholeNodes.find(n => n.id === nodeId);
      if (!node) return;
    
      // ノードを処理済みとして記録
      processedNodes.add(nodeId); 
      nodes.push(node);

      if (node.type === 'person') {
        // 配偶者とそのエッジを追加
        node.data.spouse.forEach(spouseId => {
          if (!processedNodes.has(spouseId)) {
            const spouseNode = wholeNodes.find(n => n.id === spouseId);
            if (spouseNode) {
              nodes.push(spouseNode);
              processedNodes.add(spouseId); // 配偶者を処理済みとして記録
              const maritalEdge = wholeEdges.find(e => (e.source === nodeId && e.target === spouseId) || (e.source === spouseId && e.target === nodeId));
              if (maritalEdge) edges.push(maritalEdge);
            }
          }
        });
      
        // 親系列を追加
        node.data.parents.forEach(parentId => {
          if (!processedNodes.has(parentId)) {
            findRelatedNodesAndEdges(parentId, nodes, edges, processedNodes);
          }
        });
      
        // 子孫系列を追加
        node.data.children.forEach(childId => {
          if (!processedNodes.has(childId)) {
            findRelatedNodesAndEdges(childId, nodes, edges, processedNodes);
          }
        });
      }
    
    };
    
    // useMemo内でのfindRelatedNodesAndEdgesの呼び出し
    findRelatedNodesAndEdges(selectedNodeId, lineageNodes, lineageEdges, new Set());
    

    // 重複を排除
    lineageNodes = Array.from(new Set(lineageNodes));
    lineageEdges = Array.from(new Set(lineageEdges));

    return { directLineageNodes: lineageNodes, directLineageEdges: lineageEdges };
  }, [wholeNodes, wholeEdges, selectedNode]);

  return { directLineageNodes, directLineageEdges };
}

