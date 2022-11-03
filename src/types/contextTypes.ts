import { UserType } from "@/types/userTypes";

export interface AuthContextData {
	user: UserType;
	setUserContextAndLocalStorage: (user: UserType) => void;
}
