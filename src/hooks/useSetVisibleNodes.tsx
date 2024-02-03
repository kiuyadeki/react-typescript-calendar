// import { useMemo } from "react";
// import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
// import { Edge } from "reactflow";

// export function useDirectLineage(
//   wholeNodes: (PersonNodeData | maritalNodeData)[],
//   wholeEdges: Edge[],
//   selectedNode: PersonNodeData | null
// ) {
//   const { directLineageNodes, directLineageEdges } = useMemo(() => {
//     const selectedNodeId = selectedNode?.id;
//     if (!selectedNode || selectedNode.type !== "person") return { directLineageNodes: [], directLineageEdges: [] };

//     let lineageNodes: (PersonNodeData | maritalNodeData)[] = [];
//     let lineageEdges: Edge[] = [];

//     const findRelatedNodesAndEdges = (
//       nodeId: string,
//       nodes: (PersonNodeData | maritalNodeData)[],
//       edges: Edge[],
//       processedNodes: Set<string>
//     ) => {
//       if (processedNodes.has(nodeId)) {
//         return;
//       }

//       const node = wholeNodes.find(n => n.id === nodeId);
//       if (!node) return;

//       processedNodes.add(nodeId);
//       nodes.push(node);

//       if (node.type === "person") {
//         // 配偶者とそのエッジを追加
//         node.data.spouse.forEach(spouseId => {
//           if (!processedNodes.has(spouseId)) {
//             const spouseNode = wholeNodes.find(n => n.id === spouseId);
//             if (spouseNode) {
//               nodes.push(spouseNode);
//               processedNodes.add(spouseId); // 配偶者を処理済みとして記録
//               const maritalEdge = wholeEdges.find(
//                 edge => (edge.source === nodeId && (edge.sourceHandle === "personSourceRight" || edge.sourceHandle === "personSourceLeft"))
//                 // edge => (edge.source === nodeId && edge.target === spouseId) || (edge.source === spouseId && edge.target === nodeId)
//               );
//               if (maritalEdge) edges.push(maritalEdge);
//             }
//           }
//         });

//         // 親系列を追加
//         node.data.parents.forEach(parentId => {
//           if (!processedNodes.has(parentId)) {
//             findRelatedNodesAndEdges(parentId, nodes, edges, processedNodes);
//           }
//         });

//         // 子孫系列を追加
//         node.data.children.forEach(childId => {
//           if (!processedNodes.has(childId)) {
//             findRelatedNodesAndEdges(childId, nodes, edges, processedNodes);
//           }
//         });
//       }
//     };

//     // useMemo内でのfindRelatedNodesAndEdgesの呼び出し
//     if (selectedNodeId) {
//       findRelatedNodesAndEdges(selectedNodeId, lineageNodes, lineageEdges, new Set());
//     }

//     // 重複を排除
//     lineageNodes = Array.from(new Set(lineageNodes));
//     lineageEdges = Array.from(new Set(lineageEdges));

//     return { directLineageNodes: lineageNodes, directLineageEdges: lineageEdges };
//   }, [wholeNodes, wholeEdges, selectedNode]);

//   return { directLineageNodes, directLineageEdges };
// }

import { useMemo } from "react";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { Edge } from "reactflow";

export function useDirectLineage(
  wholeNodes: (PersonNodeData | maritalNodeData)[],
  wholeEdges: Edge[],
  selectedNode: PersonNodeData | null
) {
  const { directLineageNodes, directLineageEdges } = useMemo(() => {
    if (!selectedNode || selectedNode.type !== "person") return { directLineageNodes: [], directLineageEdges: [] };

    let lineageNodes = new Set<PersonNodeData | maritalNodeData>();
    let lineageEdges = new Set<Edge>();

    // const findParents = (nodeId: string) => {
    //   const node = wholeNodes.find(n => n.id === nodeId);
    //   if (!node || lineageNodes.has(node)) return;
    //   lineageNodes.add(node);
    //   if (node.type === "person") {
    //     node.data.parents.forEach(parentId => {
    //       const parentNode = wholeNodes.find(n => n.id === parentId);
    //       if (parentNode) {
    //         lineageNodes.add(parentNode);
    //       }
    //       findParents(parentId);
    //     });
    //   }
    // }

    // const findChildren = (nodeId: string) => {
    //   const node = wholeNodes.find(n => n.id === nodeId);
    //   if (!node || lineageNodes.has(node)) return;
    //   lineageNodes.add(node);
    //   if (node.type === "person") {
    //     node.data.parents.forEach(childId => {
    //       const childNode = wholeNodes.find(n => n.id === childId);
    //       if (childNode) {
    //         lineageNodes.add(childNode);
    //       }
    //       findChildren(childId);
    //     });
    //   }
    // }

    const findRelatedNodesAndEdges = (nodeId: string) => {
      const node = wholeNodes.find(n => n.id === nodeId);
      if (!node || lineageNodes.has(node)) return;
      lineageNodes.add(node);

      if (node.type === "person") {
        // 配偶者とそのエッジを追加
        node.data.spouse.forEach(spouseId => {
          const spouseNode = wholeNodes.find(n => n.id === spouseId);
          if (spouseNode) {
            lineageNodes.add(spouseNode);
          }
        });

        // 親系列と子孫系列の追加
        node.data.parents.forEach(parentId => findRelatedNodesAndEdges(parentId));
        node.data.children.forEach(childId => findRelatedNodesAndEdges(childId));

        lineageNodes.forEach((node) => {
          if (node.type === "person") {
            const maritalNode = wholeNodes.find(n => n.id === node.data.maritalNodeId);
            maritalNode && lineageNodes.add(maritalNode);
          }
        });
      }
    };


    findRelatedNodesAndEdges(selectedNode.id);

    lineageNodes.forEach((node) => {
      const lineageEdgeList = wholeEdges.filter((edge) => edge.source === node.id);
      if (lineageEdgeList) {
        lineageEdgeList.forEach((edge) => {
          lineageEdges.add(edge);
        })
      }
    });

    return {
      directLineageNodes: Array.from(lineageNodes),
      directLineageEdges: Array.from(lineageEdges),
    };
  }, [wholeNodes, wholeEdges, selectedNode]);

  return { directLineageNodes, directLineageEdges };
}
