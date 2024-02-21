import { Edge } from 'reactflow';
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";
import { BASE_GENERATIONS_SPACING, BASE_MARITAL_SPACING, BASE_SIBLINGS_SPACING } from "../utils/constants";

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

export function useCalculateNodesPosition(
  wholeNodes: (PersonNodeData | MaritalNodeData)[],
  selectedNode: PersonNodeData | null,
  wholeEdges: Edge[]
) {
  if (!selectedNode) return;
  setDescendants(wholeNodes);
  // selectedNode.position.x = 0;
  // selectedNode.position.y = 0;

  const baseX = selectedNode.position.x;
  const baseY = selectedNode.position.y;
  const  calculateChildNodePosition = (node: PersonNodeData | MaritalNodeData, level: number, offsetX: number) => {
    if (!node) return;
    node.position.y = baseY + level * BASE_GENERATIONS_SPACING;
    if (node.type === "person") {
      const nodeTreeWidth = node.data.descendantsWidth;
      
      const isRightParent = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceLeft");
      const isLeftParent = wholeEdges.some(n => n.source === node.id && n.sourceHandle === "personSourceRight");
      if (isLeftParent) {
        node.position.x = baseX + offsetX + nodeTreeWidth / 2 - BASE_MARITAL_SPACING;
      } else if (isRightParent) {
        node.position.x = baseX + offsetX + nodeTreeWidth / 2 + BASE_MARITAL_SPACING;
      } else {
        node.position.x = baseX + offsetX;
      }
      // 配偶者の位置計算
      node.data.spouse.forEach(spouseId => {
        const spouseNode = wholeNodes.find(n => n.id === spouseId);
        if (spouseNode) {
          if(isRightParent) {
            spouseNode.position.x = baseX + offsetX + nodeTreeWidth / 2 - BASE_MARITAL_SPACING;
          } else if (isLeftParent) {
            spouseNode.position.x = baseX + offsetX + nodeTreeWidth / 2 + BASE_MARITAL_SPACING;
          }
          spouseNode.position.y = node.position.y;
        }
      });

      // maritalノードの位置計算
      if (node.data.maritalNodeId) {
        const maritalNode = wholeNodes.find(n => n.id === node.data.maritalNodeId);
        if (maritalNode) {
          maritalNode.position.x = baseX + offsetX + nodeTreeWidth / 2;
        }
      }

      // 子供の位置計算
      let cumulativeOffset = offsetX;
      let numberOfChildren = node.data.children.length;
      node.data.children.forEach((childId, index) => {
        const childNode = wholeNodes.find(n => n.id === childId) as PersonNodeData;
        if (childNode) {
          const childOffset = (node.data.descendantsWidth - (numberOfChildren - 1) * BASE_SIBLINGS_SPACING) / 2;
           calculateChildNodePosition(childNode, level + 1, cumulativeOffset + childOffset);
          cumulativeOffset += (childNode.data.descendants || 0) * BASE_SIBLINGS_SPACING;
        }
      });
    } else if (node.type === "marital") {
      node.position.x = offsetX + BASE_MARITAL_SPACING;
    }
  };

  const calculateParentNodePosition = (node: PersonNodeData | MaritalNodeData, level: number, offsetX: number) => {
    
  }

  const siblingsNodes = wholeNodes.filter(node => selectedNode.data.siblings.includes(node.id));
  let siblingsOffset = 0;
  siblingsNodes.forEach(node => {
     calculateChildNodePosition(node, 0, siblingsOffset);
    if ("data" in node && node.type === "person" && node.data.descendantsWidth) {
      if (node.data.spouse.length) {
        siblingsOffset += node.data.descendantsWidth + BASE_SIBLINGS_SPACING;
      } else {
        siblingsOffset += node.data.descendantsWidth;
      }
    }
  });
}
