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
import { EmpresaLoginType, EmpresaType } from "@/types/empresaTypes";
import { getEmpresa, postEmpresa } from "@/services/empresa";
import Notification from "@/components/common/Notification";
import { use } from "i18next";
import { CepType } from "@/types/cepType";
import { getCep } from "@/services/cep";

const CadastroEmpresa = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [novaEmpresa, setNovaEmpresa] = useState<EmpresaType>(user);
	const [loginEmpresa, setLogin] = useState<EmpresaLoginType>({} as EmpresaLoginType);
	const [novoCep, setCep] = useState<CepType>({} as CepType);

	useEffect(() => {

	}, []);

	useEffect(() => {
		setNovaEmpresa(user);
	}, [user]);

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const INITIAL_VALUES = {
		razaoSocial: novaEmpresa.razaoSocial,
		nomeFantasia: novaEmpresa.nomeFantasia,
		cnpj: novaEmpresa.cnpj,
		endereco: novaEmpresa.endereco
	};

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const fetchCep = async (cep: string) => {
		try {
			const response = await getCep(cep);
			console.log(response);
		}
		catch(e) {
			console.log(e);
		}
	}

	const criarEmpresa = async () => {
		try {
			await postEmpresa(novaEmpresa);
			// <Notification visible={true}  />
			navigate('/');
		}
		catch(e) {
			navigate('/');
		}
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
					<Form
						onFinish={criarEmpresa}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							setNovaEmpresa({
								...novaEmpresa,
								...allValues,
								dataNascimento: moment(allValues.dataNascimento).format(dateFormatDto),
							});
						}}
						initialValues={INITIAL_VALUES}
					>
						<Form.Item>
							<span>{"Email"}</span>
							<Form.Item name="email" noStyle rules={RULES}>
								<Input type={"email"} placeholder={"email"} value={novaEmpresa.email} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>Senha</span>
							<Form.Item name="senha" noStyle rules={RULES}>
								<Input type={"password"} placeholder={"senha"} value={novaEmpresa.senha} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>Repetir a senha</span>
							<Form.Item name="repete-senha" noStyle rules={RULES}>
								<Input type={"password"} placeholder={"senha"} value={novaEmpresa.senha} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{"Razao social"}</span>
							<Form.Item name="razaoSocial" noStyle rules={RULES}>
								<Input placeholder={t("name")} value={novaEmpresa.razaoSocial} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{"Nome fantasia"}</span>
							<Form.Item name="nomeFantasia" noStyle rules={RULES}>
								<Input placeholder={t("name")} value={novaEmpresa.nomeFantasia} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>CNPJ</span>
							<Form.Item name="cpf" noStyle rules={RULES}>
								<Input placeholder={"CPF"} value={novaEmpresa.cnpj} maxLength={14} />
							</Form.Item>
						</Form.Item>

						{/* <Form.Item>
							<span>RG</span>
							<Form.Item name="rg" noStyle rules={RULES}>
								<Input placeholder={"RG"} value={novaEmpresa.endereco} maxLength={12} />
							</Form.Item>
						</Form.Item> */}

						<Form.Item>
							{/* <span>{t("birth_date")}</span>
							<Form.Item name="dataNascimento" noStyle rules={RULES}>
								<DatePicker
									style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
									name="dataNascimento"
									placeholder={t("birth_date")}
									value={
										novaEmpresa.dataNascimento
											? moment(novaEmpresa.dataNascimento, dateFormatDto)
											: undefined
									}
									format={dateFormat}
								/>
							</Form.Item> */}
							<Form.Item>
								<span>CEP</span>
								<Form.Item name="cep" noStyle rules={RULES}>
									<Input placeholder={"cep"} value={novaEmpresa.endereco?.cep} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cpf" noStyle rules={RULES}>
									<Input placeholder={"CPF"} value={novaEmpresa.endereco?.logradouro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cpf" noStyle rules={RULES}>
									<Input placeholder={"CPF"} value={novaEmpresa.endereco?.numero} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cpf" noStyle rules={RULES}>
									<Input placeholder={"CPF"} value={novaEmpresa.endereco?.bairro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cpf" noStyle rules={RULES}>
									<Input placeholder={"CPF"} value={novaEmpresa.endereco?.cidade} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cpf" noStyle rules={RULES}>
									<Input placeholder={"CPF"} value={novaEmpresa.endereco?.estado} maxLength={14} />
								</Form.Item>
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
