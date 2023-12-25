const wholeNodes = [
  {
      "width": 200,
      "height": 40,
      "id": "0",
      "type": "person",
      "data": {
          "label": "Node",
          "birthYear": null,
          "birthMonth": null,
          "birthDate": null,
          "gender": null,
          "profilePicture": null,
          "parents": [],
          "children": [
              "3",
              "4",
              "5"
          ],
          "spouse": [
              "2"
          ],
          "descendants": 2
      },
      "position": {
          "x": 0,
          "y": 0
      },
      "selected": true,
      "dragging": false,
      "positionAbsolute": {
          "x": 0,
          "y": 0
      }
  },
  {
      "type": "marital",
      "id": "1",
      "data": {
          "isDivorced": false
      },
      "position": {
          "x": 200,
          "y": 0
      }
  },
  {
      "type": "person",
      "id": "2",
      "data": {
          "label": "2",
          "parents": [],
          "children": [
              "3",
              "4",
              "5"
          ],
          "spouse": [
              "0"
          ],
          "descendants": 2
      },
      "position": {
          "x": 400,
          "y": 0
      }
  },
  {
      "width": 200,
      "height": 40,
      "type": "person",
      "id": "3",
      "data": {
          "label": "3",
          "parents": [
              "0"
          ],
          "children": [],
          "spouse": [
              "11"
          ],
          "descendants": 0
      },
      "position": {
          "x": 156,
          "y": 216
      },
      "selected": true,
      "positionAbsolute": {
          "x": 156,
          "y": 216
      },
      "dragging": false
  },
  {
      "width": 200,
      "height": 40,
      "type": "person",
      "id": "4",
      "data": {
          "label": "4",
          "parents": [
              "0"
          ],
          "children": [],
          "spouse": [
              "9"
          ],
          "descendants": 0
      },
      "position": {
          "x": -252,
          "y": 314
      },
      "selected": true,
      "positionAbsolute": {
          "x": -252,
          "y": 314
      },
      "dragging": false
  },
  {
      "width": 200,
      "height": 40,
      "type": "person",
      "id": "5",
      "data": {
          "label": "5",
          "parents": [
              "0"
          ],
          "children": [],
          "spouse": [
              "7"
          ],
          "descendants": 0
      },
      "position": {
          "x": 594.7121535181236,
          "y": 296.5884861407249
      },
      "selected": true,
      "positionAbsolute": {
          "x": 594.7121535181236,
          "y": 296.5884861407249
      },
      "dragging": false
  },
  {
      "type": "marital",
      "id": "6",
      "data": {
          "isDivorced": false
      },
      "position": {
          "x": 794.7121535181236,
          "y": 296.5884861407249
      }
  },
  {
      "type": "person",
      "id": "7",
      "data": {
          "label": "7",
          "parents": [],
          "children": [],
          "spouse": [
              "5"
          ],
          "descendants": 0
      },
      "position": {
          "x": 994.7121535181236,
          "y": 296.5884861407249
      }
  },
  {
      "type": "marital",
      "id": "8",
      "data": {
          "isDivorced": false
      },
      "position": {
          "x": -52,
          "y": 314
      }
  },
  {
      "type": "person",
      "id": "9",
      "data": {
          "label": "9",
          "parents": [],
          "children": [],
          "spouse": [
              "4"
          ],
          "descendants": 0
      },
      "position": {
          "x": 148,
          "y": 314
      }
  },
  {
      "type": "marital",
      "id": "10",
      "data": {
          "isDivorced": false
      },
      "position": {
          "x": 356,
          "y": 216
      },
      "width": 10,
      "height": 10
  },
  {
      "type": "person",
      "id": "11",
      "data": {
          "label": "11",
          "parents": [],
          "children": [],
          "spouse": [
              "3"
          ],
          "descendants": 0
      },
      "position": {
          "x": 556,
          "y": 216
      },
      "width": 200,
      "height": 40
  }
]

function useCalculateNodesPosition(wholeNodes) {
  const calculatedNodes = new Map();

  const calculateDescendants = (nodeId, ancestors = []) => {
    if (calculatedNodes.has(nodeId)) return calculatedNodes.get(nodeId) || [0];
    if (ancestors.includes(nodeId)) return [0];

    const node = wholeNodes.find(node => node.id === nodeId);
    // nodeがperson型であることを確認
    if (!node || node.type !== "person" || !('children' in node.data) || !node.data.children.length) return [0];

    let descendantsCount = node.data.children.map(childId => {
      let count = calculateDescendants(childId, [...ancestors, nodeId]);
      const childNode = wholeNodes.find(n => n.id === childId);
      let spouseCount = childNode && 'spouse' in childNode.data && childNode.data.spouse ? childNode.data.spouse.length : 0;
      return count.map(c => c + spouseCount);
    });

    let maxCounts = descendantsCount.reduce((acc, counts) => {
      counts.forEach((count, index) => {
        acc[index] = Math.max(acc[index] || 0, count);
      });
      return acc;
    }, []);

    let spouseCount = 'spouse' in node.data && node.data.spouse ? 1 : 0; // 配偶者がいるかどうかを確認
    maxCounts.unshift(node.data.children.length + spouseCount);
    calculatedNodes.set(nodeId, maxCounts);
    return maxCounts;
  };

  wholeNodes.forEach(node => {
    if (node.type === "person") {
      const descendantsCounts = calculateDescendants(node.id);
      const maxDescendants = Math.max(...descendantsCounts);
      if ('descendants' in node.data) node.data.descendants = maxDescendants; // 型ガードを使用
    }
  });
}


useCalculateNodesPosition(wholeNodes);
console.log(wholeNodes);