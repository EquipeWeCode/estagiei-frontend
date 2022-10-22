import { logout } from "@/services/autenticacao";
import { AuthContextData } from "@/types/contextTypes";
import { UserType, TokenType } from "@/types/userTypes";
import React, { createContext, useEffect } from "react";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = React.useState<UserType>({} as UserType);
	const [userDecoded, setUserDecoded] = React.useState<TokenType>({} as TokenType);

	const setUserContextAndLocalStorage = (user: UserType) => {
		setUser(user);
		localStorage.setItem("userDetails", JSON.stringify(user));
	};

	useEffect(() => {
		const user = localStorage.getItem("userDetails");
		if (user) {
			setUser(JSON.parse(user));
		} else {
      setUser({} as UserType);
			logout();
    }
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUserContextAndLocalStorage, userDecoded }}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);

	return context;
};

export default AuthContext;
