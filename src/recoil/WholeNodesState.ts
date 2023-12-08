import { Node } from 'reactflow';
import { atom } from 'recoil';

const initialNodes = [
  {
    id: '0',
    type: 'person',
    data: {
      label: 'Node',
      birthYear: 1997,
      birthMonth: 3000,
      birthDate: 4000,
      gender: '',
      profilePicture: null,
      parents: [],
      children: [],
      spouse: [],
    },
    position: {x: 0, y: 50},
  },
];

export const wholeNodesState = atom<Node[]>({
  key: "wholeNodesState",
  default: initialNodes,
  dangerouslyAllowMutability: true,
});