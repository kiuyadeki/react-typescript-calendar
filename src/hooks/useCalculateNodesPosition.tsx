import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

// export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
//   const calculatedNodes = new Map<string, number[]>();

//   const calculateDescendants = (nodeId: string, ancestors: string[] = []): number[] => {
//     if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId) || [0];
//     if (ancestors.includes(nodeId)) return [1];

//     const node = wholeNodes.find(node => node.id === nodeId);
//     // nodeがperson型であることを確認
//     if (!node || node.type !== "person" || !('children' in node.data) || !node.data.children.length) return [0];

//     let descendantsCount = node.data.children.map(childId => {
//       let count = calculateDescendants(childId, [...ancestors, nodeId]);
//       const childNode = wholeNodes.find(n => n.id === childId) as PersonNodeData | undefined; // 型アサーション
//       let spouseCount = childNode && childNode.data.spouse ? childNode.data.spouse.length : 0;
//       return count.map(c => c + spouseCount);
//     });

//     let maxCounts = descendantsCount.reduce((acc, counts) => {
//       counts.forEach((count, index) => {
//         acc[index] = Math.max(acc[index] || 0, count);
//       });
//       return acc;
//     }, []);

//     let spouseCount = 'spouse' in node.data && node.data.spouse ? 1 : 0; // 配偶者がいるかどうかを確認
//     maxCounts.unshift(node.data.children.length + spouseCount);
//     calculatedNodes.set(nodeId, maxCounts);
//     return maxCounts;
//   };

//   wholeNodes.forEach(node => {
//     if (node.type === "person") {
//       const descendantsCounts = calculateDescendants(node.id);
//       const maxDescendants = Math.max(...descendantsCounts);
//       if ('descendants' in node.data) node.data.descendants = maxDescendants; // 型ガードを使用
//     }
//   });
// }

export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();

  const calculateDescendants = (nodeId: string, ancestors: string[] = []): number[] => {
    if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId)!; // 非nullアサーション
    if (ancestors.includes(nodeId)) return [0]; // 自分自身を参照する無限ループを防ぐ

    const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
    if (!node || node.type !== "person" || !node.data.children.length) return [0];

    let descendantsCount = node.data.children.map(childId => calculateDescendants(childId, [...ancestors, nodeId]));

    // 配偶者を含む子の合計数
    let spouseCount = node.data.spouse ? node.data.spouse.length : 0;
    let childrenCount = node.data.children.length + spouseCount; // 子供とその配偶者の数
    console.log("spousecount",nodeId, childrenCount);

    let maxCounts = descendantsCount.reduce((acc, counts) => {
      counts.forEach((count, index) => {
        acc[index] = (acc[index] || 0) + count; // 各世代の子孫の合計を計算
      });
      return acc;
    }, []);

    maxCounts.unshift(childrenCount); // 現ノードの子供の数（配偶者含む）を追加
    calculatedNodes.set(nodeId, maxCounts);
    return maxCounts;
  };

  // 各ノードの子孫の最大数を計算
  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
      const maxDescendants = Math.max(...descendantsCounts); // 最大の子孫数を取得
      if ('descendants' in node.data) node.data.descendants = maxDescendants; // 型ガード
    }
  });
}





