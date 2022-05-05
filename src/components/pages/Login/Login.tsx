import GoogleLogin from "@/components/common/GoogleLogin";
import GoogleLogout from "@/components/common/GoogleLogout";
import { useAuth } from "@/contexts/auth";
import { Col, Row } from "antd";
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
			<Row justify="center">
				<Col>
					<GoogleLogin />
				</Col>
			</Row>
			{/* <GoogleLogout /> */}
		</>
	);
};

export default Login;
