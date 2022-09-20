import { StudentType } from "./studentTypes";

export interface AuthContextData {
	signed: boolean;
  user: StudentType;
  setUser: (user: StudentType) => void;
  setSigned: (signed: boolean) => void;
}
