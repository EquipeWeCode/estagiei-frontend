import { UserType } from '@/types/userTypes';
import { TokenType } from "./userTypes";

export interface AuthContextData {
  user: UserType;
  setUserContextAndLocalStorage: (user: UserType) => void;
  userDecoded: TokenType;
}
