import { Node } from "reactflow";

export interface NodeData {
  label: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  birthYear?: number | null | undefined;
  birthMonth?: number | null | undefined;
  birthDate?: number | null | undefined;
  gender?: string | null | undefined;
  profilePicture?: File | null | undefined;
  parents: (string | number | null)[];
  children: (string | number | null)[];
  spouse: (string | number | null)[];
  descendants?: (string | number | null)[];
  numberOfDescendant?: number;
  numberOfAncestors?: number;
};

export interface maritalData {
  isDivorced: boolean;
}

export interface PersonNodeData extends Node {
  type: "person";
  data: NodeData;
  position: { x: number; y: number };
}

export interface maritalNodeData extends Node {
  type: "marital";
  data: maritalData;
  position: { x: number; y:number };
}