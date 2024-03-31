import { Node } from "reactflow";

export interface PersonData {
  label: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  birthYear?: number | null | undefined;
  birthMonth?: number | null | undefined;
  birthDate?: number | null | undefined;
  gender?: string | null | undefined;
  profilePicture?: File | null | undefined;
  parents: string[];
  children: string[];
  spouse: string[];
  descendants: number;
  descendantsWidth: number;
  ancestors: number;
  siblings: string[];
  maritalPosition: 'right' | 'left' | null;
  maritalNodeId?: string;
  selected: boolean;
}

export interface maritalData {
  isDivorced: boolean;
}

export interface PersonNodeData extends Node<PersonData> {
  type: "person";
  data: PersonData;
}

export interface MaritalNodeData extends Node<PersonData | maritalData> {
  type: "marital";
  data: PersonData | maritalData;
}
