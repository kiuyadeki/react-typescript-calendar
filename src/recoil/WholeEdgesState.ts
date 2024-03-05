import { Edge } from 'reactflow';
import { atom } from 'recoil';

const initialEdges: Edge[] = [];
// const initialEdges: Edge[] = [
//   {
//       "type": "smoothstep",
//       "id": "edge-0-1",
//       "source": "0",
//       "sourceHandle": "personSourceRight",
//       "target": "1",
//       "targetHandle": "maritalTargetLeft",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-2-1",
//       "source": "2",
//       "sourceHandle": "personSourceLeft",
//       "target": "1",
//       "targetHandle": "maritalTargetRight",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-3-1",
//       "source": "3",
//       "sourceHandle": "personSourceTop",
//       "target": "1",
//       "targetHandle": "maritalTargetBottom",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-3-4",
//       "source": "3",
//       "sourceHandle": "personSourceRight",
//       "target": "4",
//       "targetHandle": "maritalTargetLeft",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-5-4",
//       "source": "5",
//       "sourceHandle": "personSourceLeft",
//       "target": "4",
//       "targetHandle": "maritalTargetRight",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-6-4",
//       "source": "6",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-7-4",
//       "source": "7",
//       "sourceHandle": "personSourceTop",
//       "target": "4",
//       "targetHandle": "maritalTargetBottom",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   },
//   {
//       "type": "smoothstep",
//       "id": "edge-8-1",
//       "source": "8",
//       "sourceHandle": "personSourceTop",
//       "target": "1",
//       "targetHandle": "maritalTargetBottom",
//       "style": {
//           "stroke": "#FF0072"
//       }
//   }
// ];

//     {
//         "type": "smoothstep",
//         "id": "edge-0-1",
//         "source": "0",
//         "sourceHandle": "personSourceRight",
//         "target": "1",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-2-1",
//         "source": "2",
//         "sourceHandle": "personSourceLeft",
//         "target": "1",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-3-1",
//         "source": "3",
//         "sourceHandle": "personSourceTop",
//         "target": "1",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-4-1",
//         "source": "4",
//         "sourceHandle": "personSourceTop",
//         "target": "1",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-5-1",
//         "source": "5",
//         "sourceHandle": "personSourceTop",
//         "target": "1",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-6-1",
//         "source": "6",
//         "sourceHandle": "personSourceTop",
//         "target": "1",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-4-7",
//         "source": "4",
//         "sourceHandle": "personSourceRight",
//         "target": "7",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-8-7",
//         "source": "8",
//         "sourceHandle": "personSourceLeft",
//         "target": "7",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-9-7",
//         "source": "9",
//         "sourceHandle": "personSourceTop",
//         "target": "7",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-9-10",
//         "source": "9",
//         "sourceHandle": "personSourceRight",
//         "target": "10",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-11-10",
//         "source": "11",
//         "sourceHandle": "personSourceLeft",
//         "target": "10",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-12-10",
//         "source": "12",
//         "sourceHandle": "personSourceTop",
//         "target": "10",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-12-13",
//         "source": "12",
//         "sourceHandle": "personSourceRight",
//         "target": "13",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-14-13",
//         "source": "14",
//         "sourceHandle": "personSourceLeft",
//         "target": "13",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-15-13",
//         "source": "15",
//         "sourceHandle": "personSourceTop",
//         "target": "13",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-16-10",
//         "source": "16",
//         "sourceHandle": "personSourceTop",
//         "target": "10",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-17-10",
//         "source": "17",
//         "sourceHandle": "personSourceTop",
//         "target": "10",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-18-10",
//         "source": "18",
//         "sourceHandle": "personSourceTop",
//         "target": "10",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-19-7",
//         "source": "19",
//         "sourceHandle": "personSourceTop",
//         "target": "7",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-16-20",
//         "source": "16",
//         "sourceHandle": "personSourceRight",
//         "target": "20",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-21-20",
//         "source": "21",
//         "sourceHandle": "personSourceLeft",
//         "target": "20",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-22-20",
//         "source": "22",
//         "sourceHandle": "personSourceTop",
//         "target": "20",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-19-23",
//         "source": "19",
//         "sourceHandle": "personSourceRight",
//         "target": "23",
//         "targetHandle": "maritalTargetLeft"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-24-23",
//         "source": "24",
//         "sourceHandle": "personSourceLeft",
//         "target": "23",
//         "targetHandle": "maritalTargetRight"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-25-23",
//         "source": "25",
//         "sourceHandle": "personSourceTop",
//         "target": "23",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-26-23",
//         "source": "26",
//         "sourceHandle": "personSourceTop",
//         "target": "23",
//         "targetHandle": "maritalTargetBottom"
//     },
//     {
//         "type": "smoothstep",
//         "id": "edge-27-1",
//         "source": "27",
//         "sourceHandle": "personSourceTop",
//         "target": "1",
//         "targetHandle": "maritalTargetBottom"
//     }
// ];


export const wholeEdgesState = atom<Edge[]>({
  key: "wholeEdgesState",
  default: initialEdges,
  dangerouslyAllowMutability: true,
});