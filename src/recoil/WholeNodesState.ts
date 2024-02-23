import { Node } from "reactflow";
import { atom } from "recoil";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";

const initialNodes: (PersonNodeData | MaritalNodeData)[] = [
  {
    id: "0",
    type: "person",
    data: {
      label: "Node",
      birthYear: null,
      birthMonth: null,
      birthDate: null,
      gender: null,
      profilePicture: null,
      parents: [],
      children: [],
      spouse: [],
      siblings: ["0"],
      descendants: 0,
      descendantsWidth: 0,
      ancestors: 0,
      ancestorsWidth: 0,
    },
    position: { x: 0, y: 0 },
  },
];

export const wholeNodesState = atom<(PersonNodeData | MaritalNodeData)[]>({
  key: "wholeNodesState",
  default: initialNodes,
  dangerouslyAllowMutability: true,
});
