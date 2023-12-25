import { PersonNodeData } from '../../types/PersonNodeData';

export const InitialPersonNode: PersonNodeData = {
  type: "person",
  id: Math.random().toString(32).substring(2),
  data: {
    label: '',
    parents: [],
    children: [],
    spouse: [],
    descendants: 0,
  },
  position: { x: 0, y: 0 },
};