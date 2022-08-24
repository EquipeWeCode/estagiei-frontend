import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
	// return <>{user.codEstudante ? children : <Navigate to="/login" />}</>;
  return <>{children}</>;
};

export default PrivateRoute;
