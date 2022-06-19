import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
	const { user } = useAuth();
	return <>{user.codEstudante ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
