import { getAddedNodeId } from "./getAddedNodeId";
import { PersonNodeData, maritalNodeData } from "../types/PersonNodeData";

export const createMaritalNode = (position: maritalNodeData["position"]):maritalNodeData => {
  const maritalId = getAddedNodeId();
  return {
    type: "marital",
    id: maritalId,
    data: { isDivorced: false },
    position: { x: position.x, y: position.y },
  };
};

export const createPersonNode = (position: PersonNodeData["position"], dataOverrides = {}):PersonNodeData => {
  const nodeId = getAddedNodeId();
  return {
    type: "person",
    id: nodeId,
    data: {
      label: nodeId,
      parents: [],
      children: [],
      spouse: [],
      siblings: [nodeId],
      descendants: 0,
      descendantsWidth: 0,
      ...dataOverrides,
    },
    position: { ...position },
  };
};
