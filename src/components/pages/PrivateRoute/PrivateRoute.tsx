import { useAuth } from "@/contexts/auth";
import { UserType } from "@/types/userTypes";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	children: React.ReactNode;
	user: UserType;
	roles: string[];
}

const PrivateRoute = ({ children, user, roles }: PrivateRouteProps): JSX.Element => {
	// return <>{user.codEstudante ? children : <Navigate to="/login" />}</>;
  return <>{children}</>;
};

export default PrivateRoute;
