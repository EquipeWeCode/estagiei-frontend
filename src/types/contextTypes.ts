import { UserGoogleType } from "./userTypes";

export interface AuthContextData {
	signed: boolean;
  user: UserGoogleType;
  setUser: (user: UserGoogleType) => void;
  setSigned: (signed: boolean) => void;
}
