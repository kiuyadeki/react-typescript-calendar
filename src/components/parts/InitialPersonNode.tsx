import { getAddedNodeId } from "../../utils/getAddedNodeId";
import { PersonNodeData } from "../../types/PersonNodeData";

const nodeId = getAddedNodeId();
export const InitialPersonNode: PersonNodeData = {
  type: "person",
  id: nodeId,
  data: {
    label: "",
    parents: [],
    children: [],
    spouse: [],
    siblings: [],
    descendants: 0,
  },
  position: { x: 0, y: 0 },
};
