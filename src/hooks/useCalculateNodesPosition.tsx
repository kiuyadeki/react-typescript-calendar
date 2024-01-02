import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();

  const calculateDescendants = (nodeId: string, ancestors: string[] = []): number[] => {
    if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId)! || [0]; // 非nullアサーション
    if (ancestors.includes(nodeId)) return [0]; // 自分自身を参照する無限ループを防ぐ

    const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
    if (!node || node.type !== "person" || !node.data.children.length) {
      if (node?.data.spouse.length) {
        return [2]
      } else {
        return [1];
      }
    }

    let descendantsCount = node.data.children.map((childId, index, arr) => {
      let count = calculateDescendants(childId, [...ancestors, nodeId]);
      const childNode = wholeNodes.find(n => n.id === childId);
      if (arr.length === 1 && childNode?.type === "person" && childNode?.data.spouse.length === 0) {
        return [2];
      }
      return count;
    });

    console.log(node.id, descendantsCount);

    let maxCounts = descendantsCount.map(array => array.reduce((a, b) => a + b, 0));
    calculatedNodes.set(nodeId, maxCounts);
    return maxCounts;
  };

  // 各ノードの子孫の最大数を計算
  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
      // const maxDescendants = Math.max(...descendantsCounts); // 最大の子孫数を取得
      const maxDescendants = descendantsCounts.reduce((a, b) => a + b, 0); // 最大の子孫数を取得
      if ('descendants' in node.data) node.data.descendants = maxDescendants; // 型ガード
    }
  });
}





