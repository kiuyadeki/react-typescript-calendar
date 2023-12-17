import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export function useCalculateNodesPosition(wholeNodes: (PersonNodeData | maritalNodeData)[]) {
  wholeNodes.map(node => {
    if (node.type === "marital") return;

    if (node.data.children.length) {
      let numberOfDescendant:number = node.data.children.length;
      node.data.children.forEach(childId => {
        let childNode = wholeNodes.find(node => node.id == childId);
        console.log(node.id, childNode);
      })
    }
  });
}
