import NotFound from "@/components/pages/NotFound";
import { useAuth } from "@/contexts/auth";
interface PrivateRouteProps {
	children: React.ReactNode;
	roles: string[];
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps): JSX.Element => {
	const { user } = useAuth();
	return <>{user?.roles?.some(r => roles?.indexOf(r) >= 0) ? children : <NotFound />}</>;
};

export default PrivateRoute;
