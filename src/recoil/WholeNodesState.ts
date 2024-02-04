import { Node } from 'reactflow';
import { atom } from 'recoil';
import { PersonNodeData, maritalNodeData } from '../types/PersonNodeData';

const initialNodes:(PersonNodeData | maritalNodeData)[] = [
  {
    id: '0',
    type: "person",
    data: {
      label: 'Node',
      birthYear: null,
      birthMonth: null,
      birthDate: null,
      gender: null,
      profilePicture: null,
      parents: [],
      children: [],
      spouse: [],
      siblings: [],
      descendants: 0,
    },
    position: {x: 0, y: 0},
  },
];

export const wholeNodesState = atom<(PersonNodeData | maritalNodeData)[]>({
  key: "wholeNodesState",
  default: initialNodes,
  dangerouslyAllowMutability: true,
});