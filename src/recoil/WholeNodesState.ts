import { Node } from 'reactflow';
import { atom } from 'recoil';

const initialNodes = [
  {
    id: '0',
    type: 'person',
    data: { 
      label: 'Node',
      date_of_birth: 1997, 
      date_of_death: 3000, 
    },
    position: {x: 0, y: 50},
  },
];

export const wholeNodesState = atom<Node[]>({
  key: "wholeNodesState",
  default: initialNodes,
});