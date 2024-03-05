import { Node } from "reactflow";
import { atom } from "recoil";
import { PersonNodeData, MaritalNodeData } from "../types/PersonNodeData";

// const initialNodes: (PersonNodeData | MaritalNodeData)[] = [
//   {
//       "id": "0",
//       "type": "person",
//       "data": {
//           "label": "Node",
//           "birthYear": null,
//           "birthMonth": null,
//           "birthDate": null,
//           "gender": null,
//           "profilePicture": null,
//           "parents": [],
//           "children": [
//               "3",
//               "8"
//           ],
//           "spouse": [
//               "2",
//               "2"
//           ],
//           "siblings": [
//               "0"
//           ],
//           "descendants": 3,
//           "descendantsWidth": 1020,
//           "maritalPosition": "left",
//           "ancestors": 1,
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": 200,
//           "y": 0
//       }
//   },
//   {
//       "type": "marital",
//       "id": "1",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 340,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "2",
//       "data": {
//           "label": "2",
//           "parents": [],
//           "children": [
//               "3",
//               "8"
//           ],
//           "spouse": [
//               "0"
//           ],
//           "siblings": [
//               "2"
//           ],
//           "descendants": 3,
//           "descendantsWidth": 1020,
//           "ancestors": 1,
//           "maritalPosition": "right",
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": 480,
//           "y": 0
//       }
//   },
//   {
//       "type": "person",
//       "id": "3",
//       "data": {
//           "label": "3",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [
//               "6",
//               "7"
//           ],
//           "spouse": [
//               "5",
//               "5"
//           ],
//           "siblings": [
//               "3",
//               "8"
//           ],
//           "descendants": 2,
//           "descendantsWidth": 680,
//           "ancestors": 2,
//           "maritalPosition": "left",
//           "maritalNodeId": "4"
//       },
//       "position": {
//           "x": 30,
//           "y": 150
//       }
//   },
//   {
//       "type": "marital",
//       "id": "4",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 170,
//           "y": 150
//       }
//   },
//   {
//       "type": "person",
//       "id": "5",
//       "data": {
//           "label": "5",
//           "parents": [],
//           "children": [
//               "6",
//               "7"
//           ],
//           "spouse": [
//               "3"
//           ],
//           "siblings": [
//               "5"
//           ],
//           "descendants": 2,
//           "descendantsWidth": 680,
//           "ancestors": 1,
//           "maritalPosition": "right",
//           "maritalNodeId": "4"
//       },
//       "position": {
//           "x": 310,
//           "y": 150
//       }
//   },
//   {
//       "type": "person",
//       "id": "6",
//       "data": {
//           "label": "6",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "6",
//               "7"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 3,
//           "maritalPosition": null
//       },
//       "position": {
//           "x": 0,
//           "y": 300
//       }
//   },
//   {
//       "type": "person",
//       "id": "7",
//       "data": {
//           "label": "7",
//           "parents": [
//               "3",
//               "5"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "6",
//               "7"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 3,
//           "maritalPosition": null
//       },
//       "position": {
//           "x": 340,
//           "y": 300
//       }
//   },
//   {
//       "type": "person",
//       "id": "8",
//       "data": {
//           "label": "8",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "3",
//               "8"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 2,
//           "maritalPosition": null
//       },
//       "position": {
//           "x": 1020,
//           "y": 150
//       }
//   }
// ];

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
      maritalPosition: null,
      ancestors: 0,
    },
    position: { x: 0, y: 0 },
  },
];

export const wholeNodesState = atom<(PersonNodeData | MaritalNodeData)[]>({
  key: "wholeNodesState",
  default: initialNodes,
  dangerouslyAllowMutability: true,
});
