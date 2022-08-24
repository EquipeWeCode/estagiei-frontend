/// <reference types="vite-plugin-svgr/client" />

import { useAuth } from "@/contexts/auth";
import { Col, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { LoginType } from "@/types/userTypes";
import { getToken, postLogin } from "@/services/autenticacao";
import { TOKEN_KEY } from "@/constants";

const Login = () => {
	const { signed } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [login, setLogin] = useState({} as LoginType);
  const [token, setToken] = useState(getToken());

	useEffect((): void => {
		if (token) {
			navigate("/");
		}
	}, []);

	const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const efetuarLogin = async () => {
		const { data, status } = await postLogin(login);
    if(status == 200) {
      const token = data?.accessToken;
      localStorage.setItem(TOKEN_KEY, token);
      navigate("/");
    }
	};

	return (
		<>
			<Row justify="center" align="middle">
				<Col className="welcome-text">
					<h1>
						{t("welcome_to")} <Logo className="logo-estagiei" />{" "}
					</h1>
				</Col>
			</Row>
			<Row className="container-login" justify="space-between">
				<Col className="box-login">
					<p className="texto">{t("student_login_text")}</p>
					<Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Col style={{ marginBottom: "1rem" }}>
							<Input
								placeholder="Digite seu e-mail"
								name="email"
								value={login.email}
								onChange={changeLogin}
							/>
						</Col>
						<Col style={{ marginBottom: "1rem" }}>
							<Input
								placeholder="Digite sua senha"
								type={"password"}
								name="senha"
								value={login.senha}
								onChange={changeLogin}
							/>
						</Col>
						<Button type="primary" onClick={efetuarLogin}>
							Login
						</Button>
					</Col>
				</Col>

				<Col className="box-login">
					<p className="texto">{t("company_login_text")}</p>
					<div className="button-login">
						<LogoResumida className="logo-resumida" />
						<Button className="button-company">{t("fill_form")}</Button>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Login;
