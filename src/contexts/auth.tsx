import { AuthContextData } from "@/types/contextTypes";
import { StudentType } from "@/types/userTypes";
import React, { createContext } from "react";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = React.useState<StudentType>({} as StudentType);
  const [signed, setSigned] = React.useState(false);

	return (
		<AuthContext.Provider value={{ signed, user, setUser, setSigned }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);

	return context;
};

export default AuthContext;
