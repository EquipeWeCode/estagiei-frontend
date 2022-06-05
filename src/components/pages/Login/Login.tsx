/// <reference types="vite-plugin-svgr/client" />

import GoogleLogin from "@/components/common/GoogleLogin";
import { useAuth } from "@/contexts/auth";
import { Button, Col, Row } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";

const Login = () => {
	const { signed } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect((): void => {
		if (signed) {
			navigate("/");
		}
	}, [signed]);

	return (
		<>
			<Row justify="center" align="middle">
				<Col className="welcome-text">
					<h1>{t("welcome_to")} <Logo className="logo-estagiei"/> </h1>
				</Col>
			</Row>
			<Row className="container-login" justify="space-evenly">
				<Col className="box-login">
					<p className="texto">{t("student_login_text")}</p>
					<div className="button-login">
						<GoogleLogin />
					</div>
				</Col>

				<Col className="box-login">
					<p className="texto">{t("company_login_text")}</p>
					<div className="button-login">
            <LogoResumida className="logo-resumida"/>
						<button className="button-company">{t("fill_form")}</button>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Login;
