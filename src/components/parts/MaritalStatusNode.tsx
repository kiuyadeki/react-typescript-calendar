import { Box, Center, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { BASE_MARITAL_NODE_HEIGHT, BASE_MARITAL_NODE_WIDTH } from '../../utils/constants';
import { MaritalData } from '../../types/PersonNodeData';
import { GiBigDiamondRing } from "react-icons/gi";
import { TfiUnlink } from "react-icons/tfi";
import { useRecoilState } from 'recoil';
import { wholeNodesState } from '../../recoil/WholeNodesState';
import { isMaritalNodeData } from '../../typeGuards/maritalTypeGuards';

export const maritalNode = (props: NodeProps<MaritalData>) => {
  const {id, data } = props;
  const [wholeNodes, setWholeNodes] = useRecoilState(wholeNodesState);
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setWholeNodes(prevNodes => {
      const currentNodeId = prevNodes.findIndex(node => node.id === id);
      if(currentNodeId === -1) return prevNodes;
      // const currentNodeId = currentNode.id;
      const newNodes = [...prevNodes];
      newNodes[currentNodeId].data.isDivorced = !newNodes[currentNodeId].data.isDivorced;
      return newNodes;
    })
  };

  return (
    <Center
      onClick={handleClick}
      shadow={"md"}
      w={`${BASE_MARITAL_NODE_WIDTH}px`}
      h={`${BASE_MARITAL_NODE_HEIGHT}px`}
      borderRadius={50}
      backgroundColor="#fff"
    >
      { !data.isDivorced ?  <GiBigDiamondRing />: <TfiUnlink />}
      <Text>{data.isDivorced}</Text>
      <Handle type="target" position={Position.Right} id="maritalTargetRight" />
      <Handle type="target" position={Position.Left} id="maritalTargetLeft" />
      <Handle type="target" position={Position.Bottom} id="maritalTargetBottom" />
    </Center>
  );
};
