import { UserType } from '@/types/userTypes';
import { TokenType } from '@/types/userTypes';

export interface AuthContextData {
  user: UserType;
  setUser: (user: UserType) => void;
  userDecoded: TokenType;
}
