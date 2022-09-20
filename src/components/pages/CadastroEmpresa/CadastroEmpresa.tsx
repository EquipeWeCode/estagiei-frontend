import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Col, Space } from "antd";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, putEstudante } from "@/services/estudante";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { EmpresaType } from "@/types/empresaTypes";

const CadastroEmpresa = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [novaEmpresa, setNovaEmpresa] = useState<EmpresaType>(user);

	useEffect(() => {

	}, []);

	useEffect(() => {
		setNovoUser(user);
	}, [user]);

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const INITIAL_VALUES = {
		nome: novoUser.nome,
		cpf: novoUser.cpf,
		rg: novoUser.rg,
		instEnsino: novoUser.instEnsino,
		dataNascimento: novoUser.dataNascimento
			? moment(novoUser.dataNascimento, dateFormatDto)
			: undefined,
	};

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const salvaEstudante = async () => {
		await putEstudante(user.codEstudante, novoUser);
		const response = await getEstudante(user.codEstudante);
		setUser(response.data);
		navigate("/");
	};

	return (
		<div className="container-cadastro-estudante">
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
			<Row justify="center" className="cadastro">
				<Row className="info-dados">
					<Row justify="center">
						<h2>{t("edit_your_profile")}</h2>
					</Row>
					<Form
						onFinish={salvaEstudante}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							setNovoUser({
								...novoUser,
								...allValues,
								dataNascimento: moment(allValues.dataNascimento).format(dateFormatDto),
							});
						}}
						initialValues={INITIAL_VALUES}
					>
						<Form.Item>
							<span>{t("name")}</span>
							<Form.Item name="nome" noStyle rules={RULES}>
								<Input placeholder={t("name")} value={novoUser.nome} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>CPF</span>
							<Form.Item name="cpf" noStyle rules={RULES}>
								<Input placeholder={"CPF"} value={novoUser.cpf} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>RG</span>
							<Form.Item name="rg" noStyle rules={RULES}>
								<Input placeholder={"RG"} value={novoUser.rg} maxLength={12} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("birth_date")}</span>
							<Form.Item name="dataNascimento" noStyle rules={RULES}>
								<DatePicker
									style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
									name="dataNascimento"
									placeholder={t("birth_date")}
									value={
										novoUser.dataNascimento
											? moment(novoUser.dataNascimento, dateFormatDto)
											: undefined
									}
									format={dateFormat}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("education")}</span>
							<Form.Item name="instEnsino" noStyle>
								<Input placeholder={t("education")} value={novoUser.instEnsino} />
							</Form.Item>
						</Form.Item>

						<Form.Item style={{ marginTop: "1rem" }}>
							<Button style={{ marginRight: "2rem", backgroundColor: "#000", color: "#FFF" }}>
								<Link to={"/"}>{t("go_back")}</Link>
							</Button>
							<Button htmlType="submit" type="primary">
								{t("save")}
							</Button>
						</Form.Item>
					</Form>
				</Row>
			</Row>
		</div>
	);
};

export default CadastroEmpresa;
