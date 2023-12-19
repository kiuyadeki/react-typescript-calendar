import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

// export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
//   wholeNodes.map(node => {
//     if (node.type === "marital") return node;
//     if (!node.data.children.length) return node;

//     let numberOfDescendant: number = node.data.children.length;
//     node.data.children.forEach(childId => {
//       const childNode = wholeNodes.find(node => node.id === childId);

//       // childNodeが無ければreturn;
//       if (!childNode || childNode?.type !== "person") return;

//       childNode.data.children.forEach(childId => {
//         numberOfDescendant += childNode.data.children.length; 
//         let grandchildNode = wholeNodes.find(node => node.id === childId);
//       });
//       console.log(node.id, childNode);
//     });
//   });
// }

export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {

  const calculateDescendants = (nodeId: string | null | number): number[] => {
    const node = wholeNodes.find(node => node.id === nodeId);
    if (!node || node.type !== "person" || !node.data.children.length) return [0];

    let descendantsCount = node.data.children.map(childId => calculateDescendants(childId));
    
    let maxCounts = descendantsCount.reduce((acc, counts) => {
      counts.forEach((count, index) => {
        acc[index] = Math.max(acc[index] || 0, count);
      });
      return acc;
    }, []);

    // 現ノードの子供の数を追加
    maxCounts.unshift(node.data.children.length);
    return maxCounts;
  };

  // 各ノードの子孫の最大数を計算
  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
      const maxDescendants = Math.max(...descendantsCounts);
      // node.data.descendants = maxDescendants;
    }
  });
}

