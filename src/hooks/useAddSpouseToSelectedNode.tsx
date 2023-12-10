import { Dispatch, SetStateAction } from "react";
import { Edge, Node } from "reactflow";
import { PersonNodeData } from '../types/PersonNodeData';

export const useAddSpouseToSelectedNode = (
  setWholeNodes: Dispatch<SetStateAction<Node[]>>,
  setWholeEdges: Dispatch<SetStateAction<Edge[]>>,
  getId: () => string,
  selectedNode: null | Node
) => {
  const addSpouseToSelectedNode = () => {
    if(selectedNode) {
      const maritalId = getId();
      const maritalNode: Node = {
        type: 'marital',
        id: maritalId,
        data: { label: `Marital`},
        position: {x: selectedNode.position.x + 250, y: selectedNode.position.y},
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
        data: {label: `Spouse of ${selectedNode.data.label}`, parents: [], children: [spouseID],  spouse: [selectedNode.id]},
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

      setWholeNodes(prevNodes => [...prevNodes, maritalNode, SpouseNode]);
      const NewEdgeId = `edges-${spouseID}-${selectedNode.id}`;
      // setWholeEdges(prevEdges => [...prevEdges, {id: NewEdgeId, source: selectedNode.id, target: spouseID, sourceHandle: 'toRight', targetHandle: 'fromLeft'}]);
      setWholeEdges(prevEdges => [...prevEdges, selectedToMaritalEdge, spouseToMaritalEdge]);
    }
  }

  return addSpouseToSelectedNode;
};
