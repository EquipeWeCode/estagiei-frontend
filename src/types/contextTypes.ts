import { StudentType } from "./userTypes";

export interface AuthContextData {
	signed: boolean;
  user: StudentType;
  setUser: (user: StudentType) => void;
  setSigned: (signed: boolean) => void;
}
