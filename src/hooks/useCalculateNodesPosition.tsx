import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  wholeNodes.map(node => {
    if (node.type === "marital") return node;
    if (!node.data.children.length) return node;

    let numberOfDescendant: number = node.data.children.length;
    node.data.children.forEach(childId => {
      const childNode = wholeNodes.find(node => node.id === childId);

      // childNodeが無ければreturn;
      if (!childNode || childNode?.type !== "person") return;

      childNode.data.children.forEach(childId => {
        numberOfDescendant += childNode.data.children.length; 
        let grandchildNode = wholeNodes.find(node => node.id === childId);
      });
      console.log(node.id, childNode);
    });
  });
}
