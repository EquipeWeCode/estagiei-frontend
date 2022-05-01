import { AuthContextData } from "@/types/contextTypes";
import { UserGoogleType } from "@/types/userTypes";
import React, { createContext } from "react";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = React.useState<UserGoogleType>({} as UserGoogleType);
  const [signed, setSigned] = React.useState(false);

	return (
		<AuthContext.Provider value={{ signed, user, setUser, setSigned }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	// if (!context) {
	//   throw new Error("useAuth must be used within an AuthProvider");
	// }
	return context;
};

export default AuthContext;
