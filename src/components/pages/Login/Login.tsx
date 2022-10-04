/// <reference types="vite-plugin-svgr/client" />

import { useAuth } from "@/contexts/auth";
import { Col, Divider, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";

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
import { getEmpresa } from "@/services/empresa";

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
				const response = await getEmpresa(codEmpresa);
				user = response.data;
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
			<div className={styles.containerGeral}>
				<Row justify="center">
					<Col className={styles.boxLogin}>
						<LogoResumida width={90} />
						<h1>{t("signin")}</h1>
						<Row className={styles.containerInput} justify="center">
							<Input
								label={t("email")}
								className={styles.inputLogin}
								placeholder={t("type_email")}
								name="email"
								type="email"
								value={login.email}
								onChange={changeLogin}
							/>
							<Input
								label={t("password")}
								className={styles.inputLogin}
								placeholder={t("type_password")}
								type={"password"}
								name="senha"
								value={login.senha}
								onChange={changeLogin}
							/>
							<Button className={styles.btnLogin} onClick={efetuarLogin}>
								{t("signin")}
							</Button>
							<hr style={{width: "100%", margin: "1rem 0", border: "0.1px solid var(--primary-color)"}}/>
							<p>
								{t("dont_have_account")} <Link to="/cadastro">{t("signup")}</Link>
							</p>
							<Row justify="center" align="middle" style={{width: "100%"}}>
							<Button secondary onClick={() => navigate("/")}>
								{t("go_back")}
							</Button>
							</Row>
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Login;
