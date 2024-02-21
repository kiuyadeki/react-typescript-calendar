import { useMemo } from "react";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { Edge } from "reactflow";

export function useDirectLineage(
  wholeNodes: (PersonNodeData | MaritalNodeData)[],
  wholeEdges: Edge[],
  selectedNode: PersonNodeData | null
) {
  const { directLineageNodes, directLineageEdges } = useMemo(() => {
    if (!selectedNode || selectedNode.type !== "person")
      return { directLineageNodes: wholeNodes, directLineageEdges: wholeEdges };

    const selectedNodesSiblings = selectedNode.data.siblings;
    let lineageNodes = new Set<PersonNodeData | MaritalNodeData>();
    let lineageEdges = new Set<Edge>();
    const findRelatedNodesAndEdges = (nodeId: string, selectedNodeId: string, isParentLineage: boolean = false) => {
      const node = wholeNodes.find(n => n.id === nodeId);
      if (!node || lineageNodes.has(node)) return;
      lineageNodes.add(node);

      if (node.type === "person") {

        if(!isParentLineage) {
          node.data.spouse.forEach(spouseId => {
            const spouseNode = wholeNodes.find(n => n.id === spouseId);
            if (spouseNode) {
              lineageNodes.add(spouseNode);
            }
          });
        }

        // 親系列と子孫系列の追加
        if (node.data.parents.length) {
          node.data.parents.forEach(parentId => findRelatedNodesAndEdges(parentId, selectedNodeId, true));
        }
        node.data.children.forEach(childId => findRelatedNodesAndEdges(childId, selectedNodeId));

        if (node.id === selectedNodeId) {
          node.data.siblings?.forEach(siblingsId => findRelatedNodesAndEdges(siblingsId, selectedNodeId));
        }

        lineageNodes.forEach(node => {
          if (node.type === "person") {
            const maritalNode = wholeNodes.find(n => n.id === node.data.maritalNodeId);
            maritalNode && lineageNodes.add(maritalNode);
          }
        });
      }
    };

    findRelatedNodesAndEdges(selectedNode.id, selectedNode.id);

    lineageNodes.forEach(node => {
      const lineageEdgeList = wholeEdges.filter(edge => edge.source === node.id);
      if (lineageEdgeList) {
        lineageEdgeList.forEach(edge => {
          lineageEdges.add(edge);
        });
      }
    });

    return {
      directLineageNodes: Array.from(lineageNodes),
      directLineageEdges: Array.from(lineageEdges),
    };
  }, [wholeNodes, wholeEdges, selectedNode]);

  return { directLineageNodes, directLineageEdges };
}
