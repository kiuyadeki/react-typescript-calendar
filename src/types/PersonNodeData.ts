import { Node } from "reactflow";

export interface PersonData {
  label: string;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  birthYear?: number | null | undefined;
  birthMonth?: number | null | undefined;
  birthDate?: number | null | undefined;
  gender?: string | undefined;
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
  isDivorced: boolean;
  selected: boolean;
}

export interface MaritalData {
  isDivorced: boolean;
}

export interface PersonNodeData extends Node<PersonData> {
  type: "person";
  data: PersonData;
}

export interface MaritalNodeData extends Node<PersonData | MaritalData> {
  type: "marital";
  data: PersonData | MaritalData;
}
