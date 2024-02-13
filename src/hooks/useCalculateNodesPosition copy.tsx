import { applyNodeChanges } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export function setDescendants(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();

  const calculateDescendants = (nodeId: string, ancestors: string[] = []): number[] => {
    if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId)! || [0]; // 非nullアサーション
    if (ancestors.includes(nodeId)) return [0]; // 自分自身を参照する無限ループを防ぐ

    const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
    if (!node || node.type !== "person" || !node.data.children.length) {
      if (node?.data.spouse.length) {
        return [2]; // childrenがおらず、spouseがいる場合は2を返す（maritalSpacing * 2)
      } else {
        return [1]; // spouseがいない場合は1を返す
      }
    }

    let descendantsCount = node.data.children.map((childId, index, arr) => {
      let count = calculateDescendants(childId, [...ancestors, nodeId]); //ancestorsに計算済みのnodeIdを追加
      const childNode = wholeNodes.find(n => n.id === childId);
      if (arr.length === 1 && childNode?.type === "person" && childNode?.data.spouse.length === 0) {
        return [2]; //childrenが1人で、childrenにspouseがいない場合は2を返す
      }
      return count; // childrenにspouseがいる、または、childrenが2以上の場合はcountを返す
    });

    let maxCounts = descendantsCount.map(array => array.reduce((a, b) => a + b, 0)); // 各配列の合計値を返す 例: [[3, 2, 1], [2], [5, 6]] >> [6, 2, 11]
    calculatedNodes.set(nodeId, maxCounts); //計算済みのnodeを格納
    return maxCounts;
  };

  // 各ノードの子孫の最大数を計算
  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
      const maxDescendants = descendantsCounts.reduce((a, b) => a + b, 0); // 最大の子孫数を取得
      if ("descendants" in node.data) node.data.descendants = maxDescendants; // 型ガード
    }
  });
}

export function useCalculateNodesPosition(
  wholeNodes: (PersonNodeData | maritalNodeData)[],
  selectedNode: PersonNodeData | null
) {
  if (!selectedNode) return;

  setDescendants(wholeNodes);

  const baseX = selectedNode.position.x;
  const baseY = selectedNode.position.y;
  const siblingsSpacing = 270;
  const maritalSpacing = 180;
  const verticalSpacing = 250;

  const siblingsNodes = wholeNodes.filter(node => selectedNode.data.siblings.includes(node.id));
  const totalDescendants = siblingsNodes
    .map(node => {
      if ("descendants" in node.data) {
        return node.data.descendants;
      } else {
        return 0;
      }
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let siblingsOffset = 0;

  const placeChildNode = (node: PersonNodeData | maritalNodeData, level: number, offsetX: number) => {
    if (!node) return;
    if (node.type === "person") {
      const nodeTreeWidth = node.data.descendants * siblingsSpacing;
      console.log('nodeTreeWidth', nodeTreeWidth, node.id);
      let cumulativeOffset = 0;
      if (node.data.spouse.length) {
        node.position.x = offsetX + nodeTreeWidth / 2 - siblingsSpacing / 2;

      } else {
        node.position.x = offsetX + nodeTreeWidth / 2;
      }
      node.position.y = baseY + level * verticalSpacing;

      node.data.children.forEach((childId, index) => {
        const childNode = wholeNodes.find(n => n.id === childId) as PersonNodeData;
        if (childNode) {
          const childOffset = (childNode.data.descendants * siblingsSpacing) / 2;
          placeChildNode(childNode, level + 1, cumulativeOffset - childOffset);
          cumulativeOffset += childNode.data.descendants * siblingsSpacing;
        }
      });
    }
  };

  siblingsNodes.forEach(node => {
    placeChildNode(node, 0, siblingsOffset);
    if (node.type === "person") {
      console.log("siblindNode", node);
      siblingsOffset += node.data.descendants * siblingsSpacing;
    }
  });

  // placeNode(selectedNode.id, 0, 0);
}
