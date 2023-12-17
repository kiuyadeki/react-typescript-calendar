import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData, maritalNodeData } from '../types/PersonNodeData';

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<(PersonNodeData | maritalNodeData)[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | PersonNodeData
) => {
  const addSpouseToSelectedNode = () => {
    if(selectedNode) {
      const maritalId = getId();
      const maritalNode: maritalNodeData = {
        type: 'marital',
        id: maritalId,
        data: { isDivorced: false},
        position: {x: selectedNode.position.x + 200, y: selectedNode.position.y},
      }

      const selectedToMaritalEdge: Edge = {
        type: 'smoothstep',
        id: `edge-${selectedNode.id}-${maritalId}`,
        source: selectedNode.id,
        sourceHandle: 'toRight',
        target: maritalId,
        targetHandle: 'fromLeft',
      }

      const spouseID = getId();
      const SpouseNode: PersonNodeData = {
        type: 'person',
        id: spouseID,
        data: {label: `Spouse of ${selectedNode.data.label}`, parents: [], children: [],  spouse: []},
        position: {x: selectedNode.position.x + 400, y:selectedNode.position.y}
      };

      const spouseToMaritalEdge: Edge = {
        type: 'smoothstep',
        id: `edge-${spouseID}-${maritalId}`,
        source: spouseID,
        sourceHandle: 'toLeft',
        target: maritalId,
        targetHandle: 'fromRight',
      }

      let updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          spouse: [spouseID],
        }
      };

      setWholeNodes(prevNodes => prevNodes.map(node => {
        return node.id === selectedNode.id ? updatedNode :node;
      }));

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, SpouseNode]);
      const NewEdgeId = `edges-${spouseID}-${selectedNode.id}`;
      // setWholeEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: spouseID, sourceHandle: 'toRight', targetHandle: 'fromLeft'}]);
      setWholeEdges(prevEdges => [...prevEdges, selectedToMaritalEdge, spouseToMaritalEdge]);
    }
  }

  return addSpouseToSelectedNode;
};
