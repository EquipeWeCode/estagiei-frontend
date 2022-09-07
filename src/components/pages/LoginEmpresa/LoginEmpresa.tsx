/// <reference types="vite-plugin-svgr/client" />

import { useAuth } from "@/contexts/auth";
import { Col, Row, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { getToken, postLogin } from "@/services/autenticacao";
import { TOKEN_KEY } from "@/constants";
import { EmpresaLoginType } from "@/types/empresaTypes";

const LoginEmpresa = () => {
	const { signed } = useAuth();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [login, setLogin] = useState({} as EmpresaLoginType);
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
						{t("login_company")}
					</h1>
				</Col>
				<Space>
					<Col>
						<Logo className="logo-estagiei" />{" "}
					</Col>
				</Space>
			</Row>
			<Row className="container-login">
				<Col className="box-login" style={{minHeight:"100%"}}>
					{/* <p className="texto">{t("company_login_text")}</p> */}
					<Col style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
							<Col style={{ marginBottom: "1rem", width:"100%" }}>
								<Input
									placeholder="Digite seu e-mail"
									name="email"
									value={login.email}
									onChange={changeLogin}		
								/>
							</Col>
							<Col style={{ marginBottom: "1rem", width:"100%"  }}>
								<Input
									placeholder="Digite sua senha"
									type={"password"}
									name="senha"
									value={login.senha}
									onChange={changeLogin}
								/>
							</Col>
							<Button type="primary" onClick={efetuarLogin} style={{width:"100%"}}>
								Login
							</Button>
					</Col>
					<Col>					
						<Link to="/estudante/login">
							<a>
								{t("is_student")}
							</a>
						</Link>					
					</Col>
				</Col>
			</Row>
		</>
	);
};

export default LoginEmpresa;
