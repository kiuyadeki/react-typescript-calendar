const wholeNodes = [
  {
      "id": "0",
      "type": "person",
      "data": {
          "parents": [],
          "children": ["3"],
          "spouse": ["2"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "2",
      "data": {
          "parents": [],
          "children": ["3"],
          "spouse": ["0"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "3",
      "data": {
          "parents": ["0", "2"],
          "children": ["6","10","11","17"],
          "spouse": ["5"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "5",
      "data": {
          "parents": ["8","9"],
          "children": ["6","10","11","17"],
          "spouse": ["3"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "6",
      "data": {
          "parents": ["3","5"],
          "children": ["16"],
          "spouse": ["15"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "8",
      "data": {
          "parents": [],
          "children": ["5"],
          "spouse": ["9"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "9",
      "data": {
          "parents": [],
          "children": ["5"],
          "spouse": ["8"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "10",
      "data": {
          "parents": ["3","5"],
          "children": [],
          "spouse": ["13"],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "11",
      "data": {
          "parents": ["5", "3"],
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
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "16",
      "data": {
          "parents": ["6","15"],
          "children": [],
          "spouse": [],
          "descendants": 0
      },
  },
  {
      "type": "person",
      "id": "17",
      "data": {
          "parents": ["3","5"],
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

function useCalculateNodesPosition(wholeNodes) {
  const calculatedNodes = new Map();

  const calculateDescendants = (nodeId, ancestors = []) => {
    if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId) || [0];
    if (ancestors.includes(nodeId)) return [0];

    const node = wholeNodes.find(node => node.id === nodeId);
    // nodeがperson型であることを確認
    if (!node || node.type !== "person" || !('children' in node.data) || !node.data.children.length) {
        if (node.data.spouse.length) {
            return [2];
        } else {
            return [1];
        }
    }

    if (node.data.children.length === 1 && node.data.children[0]) {

    }

    let descendantsCount = node.data.children.map((childId, index, arr) => {
      let count = calculateDescendants(childId, [...ancestors, nodeId]);
      const childNode = wholeNodes.find(n => n.id === childId);
      if (arr.length === 1 && childNode.data.spouse.length === 0) {
        return [2];
      }
    //   let spouseCount = childNode && 'spouse' in childNode.data && childNode.data.spouse ? childNode.data.spouse.length : 0;
    //   return count.map(c => c + spouseCount); // ??
      return count;
    });
    
    // 各配列の最大値を配列で返す [[1, 5, 10], [1, 4, 3], [9]] => [9, 4, 10];
    // let maxCounts = descendantsCount.reduce((acc, counts) => {
        //   counts.forEach((count, index) => {
            //     acc[index] = Math.max(acc[index] || 0, count);
    //   });
    //   return acc;
    // }, []);
    let maxCounts = descendantsCount.map(array => array.reduce((a, b) => a + b, 0));

    // let spouseCount = 'spouse' in node.data && node.data.spouse ? 1 : 0; // 配偶者がいるかどうかを確認
    // maxCounts.unshift(node.data.children.length + spouseCount);
    calculatedNodes.set(nodeId, maxCounts);
    return maxCounts;
  };

  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
        console.log(node.id, descendantsCounts);
      const maxDescendants = Math.max(...descendantsCounts);
      if ('descendants' in node.data) node.data.descendants = maxDescendants; // 型ガードを使用
    }
  });
}


useCalculateNodesPosition(wholeNodes);
console.log(wholeNodes);