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
import styled from '@emotion/styled';

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

  const StyledHandle = styled(Handle)`
  opacity: 0;
  border: none;
  pointer-events: none;
  background: #ccc;
`;

  return (
    <Center
      onClick={handleClick}
      w={`${BASE_MARITAL_NODE_WIDTH}px`}
      h={`${BASE_MARITAL_NODE_HEIGHT}px`}
      borderRadius={50}
    >
      <Center
        bg={"#fff"} 
        transform={"scale(1.3)"}
        w={`${BASE_MARITAL_NODE_WIDTH}px`}
        h={`${BASE_MARITAL_NODE_HEIGHT}px`}
        borderRadius={50}
        shadow={"md"}
      >
        { !data.isDivorced ?  <GiBigDiamondRing />: <TfiUnlink />}
      </Center>
        <StyledHandle type="target" position={Position.Right} id="maritalTargetRight" />
        <StyledHandle type="target" position={Position.Left} id="maritalTargetLeft" />
        <StyledHandle type="target" position={Position.Bottom} id="maritalTargetBottom" />
    </Center>
  );
};
