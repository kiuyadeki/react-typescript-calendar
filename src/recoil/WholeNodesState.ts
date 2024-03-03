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
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "spouse": [
//               "2",
//               "2",
//               "2",
//               "2",
//               "2"
//           ],
//           "siblings": [
//               "0"
//           ],
//           "descendants": 10,
//           "descendantsWidth": 3280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": 1330,
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
//           "x": 1470,
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
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "spouse": [
//               "0"
//           ],
//           "siblings": [
//               "2"
//           ],
//           "descendants": 10,
//           "descendantsWidth": 3280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "1"
//       },
//       "position": {
//           "x": 1610,
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
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "3",
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 0,
//           "y": 250
//       }
//   },
//   {
//       "type": "person",
//       "id": "4",
//       "data": {
//           "label": "4",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [
//               "9",
//               "19"
//           ],
//           "spouse": [
//               "8",
//               "8"
//           ],
//           "siblings": [
//               "3",
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "descendants": 6,
//           "descendantsWidth": 1920,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "7"
//       },
//       "position": {
//           "x": 990,
//           "y": 250
//       }
//   },
//   {
//       "type": "person",
//       "id": "5",
//       "data": {
//           "label": "5",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "3",
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 2600,
//           "y": 250
//       }
//   },
//   {
//       "type": "person",
//       "id": "6",
//       "data": {
//           "label": "6",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "3",
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 2940,
//           "y": 250
//       }
//   },
//   {
//       "type": "marital",
//       "id": "7",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 1130,
//           "y": 250
//       }
//   },
//   {
//       "type": "person",
//       "id": "8",
//       "data": {
//           "label": "8",
//           "parents": [],
//           "children": [
//               "9",
//               "19"
//           ],
//           "spouse": [
//               "4"
//           ],
//           "siblings": [
//               "8"
//           ],
//           "descendants": 6,
//           "descendantsWidth": 1920,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "7"
//       },
//       "position": {
//           "x": 1270,
//           "y": 250
//       }
//   },
//   {
//       "type": "person",
//       "id": "9",
//       "data": {
//           "label": "9",
//           "parents": [
//               "4",
//               "8"
//           ],
//           "children": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "spouse": [
//               "11",
//               "11",
//               "11"
//           ],
//           "siblings": [
//               "9",
//               "19"
//           ],
//           "descendants": 4,
//           "descendantsWidth": 1240,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "10"
//       },
//       "position": {
//           "x": 650,
//           "y": 500
//       }
//   },
//   {
//       "type": "marital",
//       "id": "10",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 790,
//           "y": 500
//       }
//   },
//   {
//       "type": "person",
//       "id": "11",
//       "data": {
//           "label": "11",
//           "parents": [],
//           "children": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "spouse": [
//               "9",
//               "9"
//           ],
//           "siblings": [
//               "11"
//           ],
//           "descendants": 4,
//           "descendantsWidth": 1240,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "10"
//       },
//       "position": {
//           "x": 930,
//           "y": 500
//       }
//   },
//   {
//       "type": "person",
//       "id": "12",
//       "data": {
//           "label": "12",
//           "parents": [
//               "9",
//               "11"
//           ],
//           "children": [
//               "15"
//           ],
//           "spouse": [
//               "14"
//           ],
//           "siblings": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "13"
//       },
//       "position": {
//           "x": 340,
//           "y": 750
//       }
//   },
//   {
//       "type": "marital",
//       "id": "13",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 480,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "14",
//       "data": {
//           "label": "14",
//           "parents": [],
//           "children": [
//               "15"
//           ],
//           "spouse": [
//               "12"
//           ],
//           "siblings": [
//               "14"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "13"
//       },
//       "position": {
//           "x": 620,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "15",
//       "data": {
//           "label": "15",
//           "parents": [
//               "12",
//               "14"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "15"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 480,
//           "y": 1000
//       }
//   },
//   {
//       "type": "person",
//       "id": "16",
//       "data": {
//           "label": "16",
//           "parents": [
//               "11",
//               "9"
//           ],
//           "children": [
//               "22"
//           ],
//           "spouse": [
//               "21"
//           ],
//           "siblings": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "20"
//       },
//       "position": {
//           "x": 960,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "17",
//       "data": {
//           "label": "17",
//           "parents": [
//               "9",
//               "11"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 1580,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "18",
//       "data": {
//           "label": "18",
//           "parents": [
//               "9",
//               "11"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "12",
//               "16",
//               "17",
//               "18"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 1920,
//           "y": 750
//       }
//   },
//   {
//       "width": 200,
//       "height": 40,
//       "type": "person",
//       "id": "19",
//       "data": {
//           "label": "19",
//           "parents": [
//               "4",
//               "8"
//           ],
//           "children": [
//               "25",
//               "26"
//           ],
//           "spouse": [
//               "24",
//               "24",
//               "24"
//           ],
//           "siblings": [
//               "9",
//               "19"
//           ],
//           "descendants": 2,
//           "descendantsWidth": 680,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "23"
//       },
//       "position": {
//           "x": 1950,
//           "y": 500
//       },
//       "selected": true,
//       "dragging": false,
//       "positionAbsolute": {
//           "x": 1920,
//           "y": 500
//       }
//   },
//   {
//       "type": "marital",
//       "id": "20",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 1100,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "21",
//       "data": {
//           "label": "21",
//           "parents": [],
//           "children": [
//               "22"
//           ],
//           "spouse": [
//               "16"
//           ],
//           "siblings": [
//               "21"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 280,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "20"
//       },
//       "position": {
//           "x": 1240,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "22",
//       "data": {
//           "label": "22",
//           "parents": [
//               "16",
//               "21"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "22"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 1100,
//           "y": 1000
//       }
//   },
//   {
//       "type": "marital",
//       "id": "23",
//       "data": {
//           "isDivorced": false
//       },
//       "position": {
//           "x": 2090,
//           "y": 500
//       }
//   },
//   {
//       "type": "person",
//       "id": "24",
//       "data": {
//           "label": "24",
//           "parents": [],
//           "children": [
//               "25",
//               "26"
//           ],
//           "spouse": [
//               "19"
//           ],
//           "siblings": [
//               "24"
//           ],
//           "descendants": 2,
//           "descendantsWidth": 680,
//           "ancestors": 0,
//           "ancestorsWidth": 0,
//           "maritalNodeId": "23"
//       },
//       "position": {
//           "x": 2230,
//           "y": 500
//       }
//   },
//   {
//       "type": "person",
//       "id": "25",
//       "data": {
//           "label": "25",
//           "parents": [
//               "19",
//               "24"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "25",
//               "26"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 1920,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "26",
//       "data": {
//           "label": "26",
//           "parents": [
//               "19",
//               "24"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "25",
//               "26"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 2260,
//           "y": 750
//       }
//   },
//   {
//       "type": "person",
//       "id": "27",
//       "data": {
//           "label": "27",
//           "parents": [
//               "0",
//               "2"
//           ],
//           "children": [],
//           "spouse": [],
//           "siblings": [
//               "3",
//               "4",
//               "5",
//               "6",
//               "27"
//           ],
//           "descendants": 1,
//           "descendantsWidth": 340,
//           "ancestors": 0,
//           "ancestorsWidth": 0
//       },
//       "position": {
//           "x": 3280,
//           "y": 250
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
