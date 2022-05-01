import GoogleLogin from "@/components/common/GoogleLogin";
import GoogleLogout from "@/components/common/GoogleLogout";
import { useAuth } from "@/contexts/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { signed } = useAuth();
	const navigate = useNavigate();

	useEffect((): void => {
		if (signed) {
			navigate("/");
		}
	}, [signed]);

	return (
		<>
			<GoogleLogin />
			{/* <GoogleLogout /> */}
		</>
	);
};

export default Login;
