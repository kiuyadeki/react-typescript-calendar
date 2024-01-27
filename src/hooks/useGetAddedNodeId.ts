import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGetAddedNodeId = () => {
  return useCallback(() => uuidv4(), []);
}