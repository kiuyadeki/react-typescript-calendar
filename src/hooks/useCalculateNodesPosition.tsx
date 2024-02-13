import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";
import { BASE_MARITAL_SPACING, BASE_SIBLINGS_SPACING } from '../utils/constants';

// export function setDescendants(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
//   const calculatedNodes = new Map<string, number[]>();
//   const calculatedNodesWidth = new Map<string, number[]>();

//   const calculateDescendants = (nodeId: string, ancestors: string[] = []): [number[], number[]] => {
//     if (calculatedNodes.has(nodeId)) {
//       return [calculatedNodes.get(nodeId)!, calculatedNodesWidth.get(nodeId)!];
//     };
//     if (ancestors.includes(nodeId)){
//       console.log('anncestors', nodeId, ancestors);
//       return [[0], [0]];
//     } // 自分自身を参照する無限ループを防ぐ

//     const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
//     if (!node || node.type !== "person" || !node.data.children.length) {
//       if (node?.data.spouse.length) {
//         return [[2], [BASE_MARITAL_SPACING * 2]]; // childrenがおらず、spouseがいる場合は2を返す（maritalSpacing * 2)
//       } else {
//         return [[1], [BASE_SIBLINGS_SPACING]]; // spouseがいない場合は1を返す
//       }
//     }

//     let descendantsCount = node.data.children.map((childId, index, arr) => {
//       let [count, treeWidth] = calculateDescendants(childId, [...ancestors, nodeId]); //ancestorsに計算済みのnodeIdを追加
//       const childNode = wholeNodes.find(n => n.id === childId);
//       if (arr.length === 1 && childNode?.type === "person" && childNode?.data.spouse.length === 0) {
//         return [2]; //childrenが1人で、childrenにspouseがいない場合は2を返す
//       }
//       return count; // childrenにspouseがいる、または、childrenが2以上の場合はcountを返す
//     });
//     let childDescendantsWidth = node.data.children.map((childId, index, arr) => {
//       let [count, treeWidth] = calculateDescendants(childId, [...ancestors, nodeId]); //ancestorsに計算済みのnodeIdを追加
//       const childNode = wholeNodes.find(n => n.id === childId);
//       if (arr.length === 1 && childNode?.type === "person" && childNode?.data.spouse.length === 0) {
//         return [BASE_MARITAL_SPACING * 2];
//       }
//       return treeWidth;
//     });

//     if (node.data.children.length === 1) {
//       const childNode = wholeNodes.find(n => n.id === node.data.children[0]) as PersonNodeData;
//       if (!childNode?.data.spouse.length) {
//         childDescendantsWidth = [[BASE_MARITAL_SPACING * 2]];
//       }
//     }

//     let maxCounts = descendantsCount.map(array => array.reduce((a, b) => a + b, 0)); // 各配列の合計値を返す 例: [[3, 2, 1], [2], [5, 6]] >> [6, 2, 11]
//     let descendantWidthArray = childDescendantsWidth.map(array => array.reduce((a, b) => a + b, 0));
//     calculatedNodes.set(nodeId, maxCounts); //計算済みのnodeを格納
//     calculatedNodesWidth.set(nodeId, descendantWidthArray);
//     return [maxCounts, descendantWidthArray];
//   };

//   // 各ノードの子孫の最大数を計算
//   wholeNodes.forEach(node => {
//     if (node.type === "person") {
//       const [descendantsCounts, descendantsWidth] = calculateDescendants(node.id);
//       const maxDescendants = descendantsCounts.reduce((a, b) => a + b, 0); // 最大の子孫数を取得
//       const maxDescendantsWidth = descendantsWidth.reduce((a, b) => a + b, 0);
//       if ("descendants" in node.data) node.data.descendants = maxDescendants; // 型ガード
//       if ("descendantsWidth" in node.data) node.data.descendantsWidth = maxDescendantsWidth;
//     }
//   });
// }

export function setDescendants(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();
  const calculatedNodeWidths = new Map<string, number[]>();

  // 個々のノードの子孫データを計算
  function calculateNodeDescendants(nodeId: string, ancestors: string[] = []): [number[], number[]] {
    if (calculatedNodes.has(nodeId)) {
      return [calculatedNodes.get(nodeId)!, calculatedNodeWidths.get(nodeId)!];
    }

    if (ancestors.includes(nodeId)) {
      console.log('ancestors', nodeId, ancestors);
      return [[0], [0]]; 
    } 

    const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
    if (!node || node.type !== "person" || !node.data.children.length) {
      const defaultCounts = node?.data.spouse.length ? [2] : [1];
      const defaultSpacing = node?.data.spouse.length ? BASE_MARITAL_SPACING * 2 : BASE_SIBLINGS_SPACING;
      return [defaultCounts, [defaultSpacing]];
    }

    const childCounts = node.data.children.map(childId => {
      const [counts, widths] = calculateNodeDescendants(childId, [...ancestors, nodeId]);
      return counts;
    });

    let childWidths = node.data.children.map(childId => {
      const [counts, widths] = calculateNodeDescendants(childId, [...ancestors, nodeId]);
      return widths;
    });

    // 子が1人で未婚の場合の調整
    if (node.data.children.length === 1) {
      const childNode = wholeNodes.find(n => n.id === node.data.children[0]);
      if (childNode && childNode.type === "person" && !childNode.data.spouse.length) {
        childWidths = [[BASE_MARITAL_SPACING * 2]];
      }
    }

    const maxCounts = childCounts.map(array => array.reduce((a, b) => a + b, 0));
    const descendantWidths = childWidths.map(array => array.reduce((a, b) => a + b, 0));

    calculatedNodes.set(nodeId, maxCounts);
    calculatedNodeWidths.set(nodeId, descendantWidths);
    return [maxCounts, descendantWidths];
  }

  // wholeNodes 内の全personノードに対して子孫カウント・幅を設定 
  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const [descendantCounts, descendantWidths] = calculateNodeDescendants(node.id);
      if ("descendants" in node.data) node.data.descendants = descendantCounts.reduce((a, b) => a + b, 0);
      if ("descendantsWidth" in node.data) node.data.descendantsWidth = descendantWidths.reduce((a, b) => a + b, 0);
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
