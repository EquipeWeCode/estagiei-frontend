import Button from "@/components/common/Button";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import Input from "@/components/common/Input";
import { InputPassword } from "@/components/common/Input/Input";
import { negateCadastroetp1, setState } from "@/redux/reducers/cadastro";
import { useAppDispatch, useAppSelector } from "@/redux/reducers/hooks";
import { getToken } from "@/services/autenticacao";
import { getUsuarios } from "@/services/usuario";
import { Form, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const CadastroEstudanteInicio = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [token, setToken] = useState(getToken());

	const novoEstudante = useAppSelector(state => state.cadastro.estudante);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, []);

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const RULES_PASSWORD = [
		{
			required: true,
			message: t("confirm_pwd"),
		},
		({ getFieldValue }: any) => ({
			validator(_: any, value: any) {
				if (!value || getFieldValue("senha") === value) {
					return Promise.resolve();
				}
				return Promise.reject(new Error(t("pwd_not_match")));
			},
		}),
	];

	const transferDataFinishingForm = () => {
		getUsuarios({ email: novoEstudante.email }).then(res => {
			if (res.data?.length > 0) {
				message.error(t("email_already_exists"));
			} else {
				dispatch(negateCadastroetp1());
			}
		});
	};

	return (
		<div className={styles.containerGeral}>
			<Row
				justify="center"
				style={{ wordBreak: "break-word", width: "30%", textAlign: "center" }}
				className={styles.fontStyle}
			>
				<h2 style={{ color: "white" }}>{t("login_home")}</h2>
			</Row>
			<Row justify="center" className={styles.boxLogin}>
				<Form
					onFinish={transferDataFinishingForm}
					name="cadastroEstudante"
					onValuesChange={(changedValues, allValues) => {
						if (changedValues.repeteSenha) return;
						dispatch(setState({ ...novoEstudante, ...changedValues }));
					}}
					initialValues={novoEstudante}
					className={styles.containerInput}
				>
					<Form.Item>
						<Form.Item name="email" noStyle rules={RULES}>
							<Input
								label={t("email")}
								type={"email"}
								placeholder={t("type_email")}
								value={novoEstudante.email}
							/>
						</Form.Item>
					</Form.Item>

					<Form.Item>
						<Form.Item name="senha" noStyle rules={RULES}>
							<InputPassword
								label={t("password")}
								type={"password"}
								placeholder={t("type_password")}
								value={novoEstudante.senha}
								maxLength={14}
								minLength={8}
							/>
						</Form.Item>
					</Form.Item>

					<Form.Item>
						<Form.Item name="repeteSenha" noStyle rules={RULES_PASSWORD} dependencies={["senha"]}>
							<InputPassword
								label={t("type_repeat_password")}
								type={"password"}
								placeholder={t("type_password")}
								value={novoEstudante.senha}
								maxLength={14}
								minLength={8}
							/>
						</Form.Item>
					</Form.Item>

					<Form.Item style={{ marginTop: "1rem" }}>
						<Row
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button
								htmlType="submit"
								type="primary"
								className={styles.btnLogin}
								style={{ width: "100%" }}
							>
								{t("singup")}
							</Button>
						</Row>
					</Form.Item>

					<hr
						style={{ width: "100%", margin: "1rem 0", border: "0.1px solid var(--primary-color) " }}
					/>

					<Row style={{ display: "flex", marginBottom: "20px" }}>
						<span style={{ flex: "1" }}>
							{t("singup_as")} <Link to={"/cadastro/empresa"}>{t("company")}</Link>
						</span>
					</Row>

					<Row justify="center" align="middle" style={{ width: "100%" }}>
						<ButtonVoltar />
					</Row>
				</Form>
			</Row>
		</div>
	);
};

export default CadastroEstudanteInicio;
