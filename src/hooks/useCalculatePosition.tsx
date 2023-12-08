import { Edge, Node } from "reactflow";
import { PersonNodeData } from "../types/PersonNodeData";

function calculatePosition(
  nodes: PersonNodeData[],
  edges: Edge[],
  nodeId: string,
  level: number = 0,
  parentNode?: PersonNodeData
) {
  // ベースレベルでのノード検索と配置
  const node = nodes.find(n => n.id === nodeId);
  if (!node) return;

  // レベルに応じたX,Yスペース
  const spacingX = 200;
  const spacingY = 100 * level;

  // 親ノードが存在する場合
  if (parentNode) {
    node.position = {
      x: parentNode.position.x,
      y: parentNode.position.y - spacingY,
    };
  } else {
    // 中心ノードの配置
    node.position = { x: 0, y: 0 }; // 仮の基準点
  }

  // 配偶者ノードの配置
  if (node.data.spouseId) {
    const spouse = nodes.find(n => n.id === node.data.spouseId);
    if (spouse) {
      spouse.position = {
        x: node.position.x + spacingX, // 配偶者は常に右側
        y: node.position.y,
      };
    }
  }

  // 子ノードの配置
  const childrenEdges = edges.filter(e => e.source === node.id);
  childrenEdges.forEach((edge, index) => {
    const childNode = nodes.find(n => n.id === edge.target);
    if (childNode) {
      childNode.position = {
        x: node.position.x + (index - childrenEdges.length / 2) * spacingX,
        y: node.position.y + spacingY,
      };
      // 子ノードに対して再帰的に位置を計算
      calculatePosition(nodes, edges, childNode.id, level + 1, node);
    }
  });

  // 兄弟ノードの配置（親ノードが存在する場合のみ）
  if (parentNode) {
    const siblingEdges = edges.filter(e => e.target === parentNode.id && e.source !== node.id);
    siblingEdges.forEach((edge, index) => {
      const siblingNode = nodes.find(n => n.id === edge.source);
      if (siblingNode) {
        siblingNode.position = {
          x: parentNode.position.x - spacingX * (index + 1),
          y: parentNode.position.y,
        };
        // 配偶者がいれば、その配置も更新
        if (siblingNode.data.spouseId) {
          const siblingSpouse = nodes.find(n => n.id === siblingNode.data.spouseId);
          if (siblingSpouse) {
            siblingSpouse.position = {
              x: siblingNode.position.x + spacingX,
              y: siblingNode.position.y,
            };
          }
        }
      }
    });
  }
}
