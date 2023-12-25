const wholeNodes = [
  {
    "id": "0",
    "type": "person",
    "data": {
        "parents": [],
        "children": ["3","4","5","6"],
        "spouse": ["1"],
        "descendants": 0,
    },
  },
]

const Nodes = [
  {
      "id": "0",
      "type": "person",
      "data": {
          "parents": [],
          "children": ["3"],
          "spouse": ["2"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "2",
      "data": {
          "parents": [],
          "children": ["3"],
          "spouse": ["0"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "3",
      "data": {
          "parents": ["0"],
          "children": ["6","10","11","17"],
          "spouse": ["5"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "5",
      "data": {
          "parents": ["8","9"],
          "children": ["6","10","11","17"],
          "spouse": ["3"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "6",
      "data": {
          "parents": ["3"],
          "children": ["16"],
          "spouse": ["15"],
          "descendants": 2
      },
  },
  {
      "type": "person",
      "id": "8",
      "data": {
          "parents": [],
          "children": ["5"],
          "spouse": ["81"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "9",
      "data": {
          "parents": [],
          "children": ["5"],
          "spouse": ["8"],
          "descendants": 5
      },
  },
  {
      "type": "person",
      "id": "10",
      "data": {
          "parents": ["3"],
          "children": [],
          "spouse": ["13"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "11",
      "data": {
          "parents": ["5"],
          "children": [],
          "spouse": ["19"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "13",
      "data": {
          "parents": [],
          "children": [],
          "spouse": ["10"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "15",
      "data": {
          "parents": [],
          "children": ["16"],
          "spouse": ["6"],
          "descendants": 2
      },
  },
  {
      "type": "person",
      "id": "16",
      "data": {
          "parents": ["6"],
          "children": [],
          "spouse": [],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "17",
      "data": {
          "parents": ["5"],
          "children": [],
          "spouse": [],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "19",
      "data": {
          "parents": [],
          "children": [],
          "spouse": ["11"],
          "descendants": 0
      },
  }
]