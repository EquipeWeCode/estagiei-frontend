/// <reference types="vite-plugin-svgr/client" />

import { useAuth } from "@/contexts/auth";
import { Col, Row } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles.module.scss";

import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import Button from "@/components/common/Button";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import Input from "@/components/common/Input";
import { TOKEN_KEY, USER_KEY } from "@/constants";
import { getToken, postLogin } from "@/services/autenticacao";
import { getEmpresa } from "@/services/empresa";
import { getEstudante } from "@/services/estudante";
import { getUsuario } from "@/services/usuario";
import { LoginType, UserType } from "@/types/userTypes";
import jwt from "jwt-decode";

const Login = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { user, setUser } = useAuth();
	const [login, setLogin] = useState({} as LoginType);
	const [token, setToken] = useState(getToken());
	const [searchParams, setSearchParams] = useSearchParams();

	const expired = searchParams.get("sessionExpired");
	const notAuthenticated = searchParams.get("notAuthenticated");
	const next = searchParams.get("next");

	useEffect((): void => {
		if (token !== null && USER_KEY && user?.roles) {
			navigate("/");
		}
	}, []);

	const navegaProximaPagina = (proximaPagina: string) => {
		navigate(proximaPagina);
	};

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

			next
				? navegaProximaPagina(next)
				: codEmpresa
				? navegaProximaPagina("/empresa/meu-perfil")
				: codEstudante
				? navegaProximaPagina("/vagas")
				: navegaProximaPagina("/");
		}
	};

	return (
		<>
			<div className={styles.containerGeral}>
				<Row justify="center">
					<Col className={styles.boxLogin}>
						<LogoResumida width={90} />
						<h1>{t("signin")}</h1>
						{expired && <p className={styles.expired}>{t("expired_session")}</p>}
						{notAuthenticated && <p className={styles.expired}>{t("not_authenticated")}</p>}
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
							<hr
								style={{
									width: "100%",
									margin: "1rem 0",
									border: "0.1px solid var(--primary-color)",
								}}
							/>
							<p>
								{t("dont_have_account")} <Link to="/cadastro">{t("signup")}</Link>
							</p>
							<Row justify="center" align="middle" style={{ width: "100%" }}>
								<ButtonVoltar secondary />
							</Row>
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Login;
