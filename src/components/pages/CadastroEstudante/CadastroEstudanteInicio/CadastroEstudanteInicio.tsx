import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, postEstudante, putEstudante } from "@/services/estudante";
import { CadastroEstudanteType, UserType } from "@/types/userTypes";
import { CompetenciaType } from "@/types/competenciaType";
import { getCompetencias } from "@/services/competencias";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { getToken } from "@/services/autenticacao";
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from "@/redux/reducers/hooks";
import { negateCadastroetp1 } from "@/redux/reducers/cadastro";

type CadastroEstudanteTypeUuid = {
	email?: string,
	senha?: string
}

const CadastroEstudanteInicio = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [token, setToken] = useState(getToken());
	const { user, setUser } = useAuth();

	const [novoEstudante, cadastrarEstudante] = useState<CadastroEstudanteTypeUuid>({} as CadastroEstudanteTypeUuid);

	const dispatch = useAppDispatch();
	const cadastroetp1 = useAppSelector(state => state.cadastro.cadastroetp1);

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
		}
	];

	const RULES_PASSWORD = [
		{
		  required: true,
		  message: 'Please confirm your password!',
		},
		({ getFieldValue }: any) => ({
		  validator(_: any, value: any) {
			if (!value || getFieldValue('senha') === value) {
			  return Promise.resolve();
			}
			return Promise.reject(new Error('The two passwords that you entered do not match!'));
		  },
		}),
	];

	const transferDataFinishingForm = () => {
		dispatch(negateCadastroetp1());
	}

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" style={{wordBreak: "break-word", width:"30%", textAlign: "center"}} className={styles.fontStyle}>
				<h2 style={{color: "white"}}>{t("login_home")}</h2>
			</Row>
			<Row justify="center" className={styles.boxLogin}>
					<Form
						onFinish={transferDataFinishingForm}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							cadastrarEstudante({
								...novoEstudante,
								...allValues,
								dataNascimento: moment(allValues.dataNascimento).format(dateFormatDto),
							});
						}}
						style={{width: "70%"}}
					>
						<Form.Item>
								<Form.Item name="email" noStyle rules={RULES}>
									<Input label={t("email")} type={"email"} placeholder={t("type_email")} value={novoEstudante.email}/>
								</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item name="senha" noStyle rules={RULES}>
								<Input label={t("password")} type={"password"} placeholder={t("type_password")} value={novoEstudante.senha} maxLength={14} minLength={8}/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item name="repete-senha" noStyle rules={RULES_PASSWORD} dependencies={['senha']}>
								<Input label={t("type_repeat_password")} type={"password"} placeholder={t("type_password")} value={novoEstudante.senha} maxLength={14} minLength={8}/>
							</Form.Item>
						</Form.Item>

						<hr
								style={{
									width: "100%",
									margin: "1rem 0",
									border: "0.1px solid var(--primary-color)",
								}}
						/>

						<Form.Item style={{ marginTop: "1rem" }}>
							<Row style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
								<Button htmlType="submit" type="primary" className={styles.btnLogin} style={{width: "100%"}}>
									{t("singup")}
								</Button>
							</Row>
						</Form.Item>
						<Row style={{display: "flex"}}>
							<span style={{flex:"1"}}>Cadastre-se como <Link to={"/cadastro/empresa"}>empresa</Link></span>
						</Row>

						<Row justify="center" align="middle" style={{ width: "100%" }}>
								<Button secondary onClick={() => navigate("/login")}>
									{t("go_back")}
								</Button>
						</Row>
					</Form>
			</Row>
		</div>
	);
};

export default CadastroEstudanteInicio;
