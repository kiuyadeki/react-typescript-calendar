import { Edge } from "reactflow";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING, BASE_SIBLINGS_SPACING } from "../utils/constants";
import { MaritalStatusNode } from "../components/parts/MaritalStatusNode";

export function setDescendants(wholeNodes: (PersonNodeData | MaritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();
  const calculatedNodeWidths = new Map<string, number[]>();

  function calculateNodeDescendants(nodeId: string, ancestors: string[] = []): [number[], number[]] {
    if (calculatedNodes.has(nodeId)) {
      return [calculatedNodes.get(nodeId)!, calculatedNodeWidths.get(nodeId)!];
    }

    if (ancestors.includes(nodeId)) {
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

  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const [descendantCounts, descendantWidths] = calculateNodeDescendants(node.id);
      if ("descendants" in node.data) node.data.descendants = descendantCounts.reduce((a, b) => a + b, 0);
      if ("descendantsWidth" in node.data) node.data.descendantsWidth = descendantWidths.reduce((a, b) => a + b, 0);
    }
  });
}

export function setAncestors(wholeNodes: (PersonNodeData | MaritalNodeData)[]) {
  const calculatedNodes = new Map<string, number[]>();

  function calculateNodeAncestors(nodeId: string, ancestors: string[] = []): number[] {
    if (calculatedNodes.has(nodeId)) {
      return calculatedNodes.get(nodeId)!;
    }

    const node = wholeNodes.find(node => node.id === nodeId) as PersonNodeData | undefined;
    if (!node || node.type !== "person" || !node.data.parents.length) {
      return [1];
    }

    const parentCounts = node.data.parents.map(parentId => {
      const counts = calculateNodeAncestors(parentId, [...ancestors, nodeId]);
      return counts;
    });

    const maxParentsCount = parentCounts.map(array => array.reduce((a, b) => a + b, 0));

    calculatedNodes.set(nodeId, maxParentsCount);
    return maxParentsCount;
  }

  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const maxParentsCount = calculateNodeAncestors(node.id);
      if ("ancestors" in node.data) node.data.ancestors = maxParentsCount.reduce((a, b) => a + b, 0);
    }
  });
}

export function useCalculateNodesPosition(
  wholeNodes: (PersonNodeData | MaritalNodeData)[],
  selectedNode: PersonNodeData | null,
  wholeEdges: Edge[]
) {
  if (!selectedNode) return;
  setDescendants(wholeNodes);
  setAncestors(wholeNodes);
  // 子孫ノードの位置計算
  const calculateChildNodePosition = (node: PersonNodeData | MaritalNodeData, level: number, offsetX: number) => {
    if (!node) return;
    node.position.y = level * BASE_GENERATIONS_SPACING;
    if (node.type === "person") {
      const nodeDescendantsWidth = node.data.descendantsWidth;
      const isRightNode = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceLeft");
      const isLeftNode = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceRight");

      if (isLeftNode) {
        if(node.data.children.length === 1) {
          node.position.x = offsetX + nodeDescendantsWidth / 2 - BASE_MARITAL_SPACING;
        } else {
          node.position.x = offsetX + (nodeDescendantsWidth - BASE_SIBLINGS_SPACING) / 2 - BASE_MARITAL_SPACING;
        }
      } else if (isRightNode) {
        if(node.data.children.length === 1) {
          node.position.x = offsetX + nodeDescendantsWidth / 2 + BASE_MARITAL_SPACING;
        } else {
          node.position.x = offsetX + (nodeDescendantsWidth - BASE_SIBLINGS_SPACING) / 2 + BASE_MARITAL_SPACING;
        }
      } else {
        if(!(node.data.siblings.length > 1)) {
          node.position.x = offsetX + BASE_MARITAL_SPACING;
        } else {
          node.position.x = offsetX;
        }
      }
      // 配偶者の位置計算
      node.data.spouse.forEach(spouseId => {
        const spouseNode = wholeNodes.find(n => n.id === spouseId);
        if (spouseNode) {
          if (isRightNode) {
            spouseNode.position.x = node.position.x - BASE_MARITAL_SPACING * 2;
          } else if (isLeftNode) {
            spouseNode.position.x = node.position.x + BASE_MARITAL_SPACING * 2;
          }
          spouseNode.position.y = node.position.y;
        }
      });

      // maritalノードの位置計算
      if (node.data.maritalNodeId) {
        const maritalNode = wholeNodes.find(n => n.id === node.data.maritalNodeId);
        if (maritalNode) {
          maritalNode.position.y = node.position.y;
          if (isRightNode) {
            maritalNode.position.x = node.position.x - BASE_MARITAL_SPACING;
          } else if (isLeftNode) {
            maritalNode.position.x = node.position.x + BASE_MARITAL_SPACING;
          }
        }
      }

      // 子供の位置計算
      let cumulativeOffset = offsetX;
      const childrenCounts = node.data.children.length;
      node.data.children.forEach((childId, index) => {
        const childNode = wholeNodes.find(n => n.id === childId) as PersonNodeData;
        if (childNode) {
          calculateChildNodePosition(childNode, level + 1, cumulativeOffset);
          // console.log(childNode.id, "cumulativeOffset", cumulativeOffset);
          if (childNode.data.children.length) {
            cumulativeOffset += childNode.data.descendantsWidth + BASE_SIBLINGS_SPACING;
          } else {
            cumulativeOffset += BASE_SIBLINGS_SPACING;
          }
        }
      });
    } else if (node.type === "marital") {
      node.position.x = offsetX + BASE_MARITAL_SPACING;
    }
  };

  const calculateParentNodePosition = (node: PersonNodeData | MaritalNodeData, level: number, offsetX: number) => {
    if (!node) return;
    node.position.y = level * BASE_GENERATIONS_SPACING;
    if (node.type === "person") {
      const isRightNode = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceLeft");
      const isLeftNode = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceRight");

      if (node.id = selectedNode.id) {}

      if (isLeftNode) {
      } else if (isRightNode) {
      } else {
        node.position.x = offsetX;
      }

      node.data.spouse.forEach(spouseId => {
        const spouseNode = wholeNodes.find(n => n.id === spouseId);
        if (spouseNode) {
          spouseNode.position.y = node.position.y;
        }
      });

      // maritalノードの位置計算
      if (node.data.maritalNodeId) {
        const maritalNode = wholeNodes.find(n => n.id === node.data.maritalNodeId);
      }

      let cumulativeOffset = offsetX;
      node.data.parents.forEach(parentId => {
        const parentNode = wholeNodes.find(n => n.id === parentId) as PersonNodeData;
        if (parentNode) {
          calculateParentNodePosition(parentNode, level + 1, cumulativeOffset)
        }
      });
    }
  };

  const siblingsNodes = wholeNodes.filter(node => selectedNode.data.siblings.includes(node.id));
  let siblingsOffset = 0;
  // calculateParentNodePosition(selectedNode, 0, 0);
  siblingsNodes.forEach(node => {
    calculateChildNodePosition(node, 0, siblingsOffset);
    if ("data" in node && node.type === "person" && node.data.descendantsWidth) {
      if (node.data.spouse.length) {
        console.log(node.id, 'hasSpousesiblingsOffset', siblingsOffset);
        siblingsOffset += node.data.descendantsWidth + BASE_SIBLINGS_SPACING;
      } else {
        console.log(node.id, 'siblingsOffset', siblingsOffset);
        siblingsOffset += node.data.descendantsWidth;
      }
    }
  });
}
