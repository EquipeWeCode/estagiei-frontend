/// <reference types="vite-plugin-svgr/client" />

import { useAuth } from "@/contexts/auth";
import { Col, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { LoginType, UserType } from "@/types/userTypes";
import { getToken, postLogin } from "@/services/autenticacao";
import { TOKEN_KEY } from "@/constants";
import jwt from "jwt-decode";
import { getUsuario } from "@/services/usuario";
import { getEstudante } from "@/services/estudante";

const Login = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { setUser } = useAuth();
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
		if (status == 200) {
			const token = data?.accessToken;
			const roles = data?.roles;
			localStorage.setItem(TOKEN_KEY, token);

			const decoded = jwt(token) as any;

			const codUsuario = decoded?.sub?.split(",")[0];
			const { data: userData } = await getUsuario(codUsuario);
			const codEmpresa = userData?.codEmpresa;
			const codEstudante = userData?.codEstudante;

			let user: UserType = {} as UserType;

			if (codEmpresa) {
				// const response = await getEmpresa(codEmpresa);
				// user = response.data;
			} else if (codEstudante) {
				const response = await getEstudante(codEstudante);
				user = response.data;
			}
			
			user.roles = roles;
			
			setUser(user);
			localStorage.setItem("userDetails", JSON.stringify(user));
			navigate("/");
		}
	};

	return (
		<>
			{/* <Row justify="center" align="middle">
				<Col className="welcome-text">
					<h1>
						{t("welcome_to")} <Logo className="logo-estagiei" />{" "}
					</h1>
				</Col>
			</Row> */}
			<div className={styles.containerGeral}>
				<Row className={styles.containerLogin} justify="space-between" style={{}}>
					<Col className={styles.boxLogin}>
						{/* <p className="texto">{t("student_login_text")}</p>
						 */}
						<LogoResumida width={200}/>
						<h1>Login</h1>
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

					{/* <Col className="box-login">
					<p className="texto">{t("company_login_text")}</p>
					<div className="button-login">
					<LogoResumida className="logo-resumida" />
					<Link to="/empresa/login">
					<Button className="button-company">{t("fill_form")}</Button>
					</Link>
					</div>
				</Col> */}
				</Row>
			</div>
		</>
	);
};

export default Login;
