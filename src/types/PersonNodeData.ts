import { Node } from "reactflow";

export interface NodeData {
  label: string;
  firstName?: string;
  lastName?: string;
  birthYear?: number;
  birthMonth?: number;
  birthDate?: number;
  gender?: string;
  profilePicture?: File;
  parents: (string | number)[];
  children: (string | number)[];
  spouse: (string | number)[];
};

export interface PersonNodeData extends Node {
  data: NodeData;
  position: { x: number; y: number };
}