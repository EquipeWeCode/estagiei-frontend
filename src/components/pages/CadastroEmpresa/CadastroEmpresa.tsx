import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import Button from "@/components/common/Button";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import Input from "@/components/common/Input";
import { InputNumber, InputPassword } from "@/components/common/Input/Input";
import InputSelect from "@/components/common/InputSelect/InputSelect";
import ButtonUpload from "@/components/common/UploadCloudinary/ButtonUpload";
import { getToken } from "@/services/autenticacao";
import { getCep } from "@/services/cep";
import { getCidades } from "@/services/cidades";
import { postEmpresa } from "@/services/empresa";
import { getEstados } from "@/services/estados";
import { CepType } from "@/types/cepType";
import { CidadeType } from "@/types/cidadeType";
import { EnderecoType } from "@/types/enderecoType";
import { EstadoType } from "@/types/estadoType";
import { Col, Form, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUrlImagem } from "../CadastroEstudante/TerminoCadastro/TerminoCadastro";
import styles from "./styles.module.scss";

type FormCadastroEmpresaType = {
	email?: string;
	senha?: string;
	razaoSocial?: string;
	nomeFantasia?: string;
	cnpj?: string;
	endereco: EnderecoType;
};

const CadastroEmpresa = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [token, setToken] = useState(getToken());

	const [formEmpresa, setForm] = useState<FormCadastroEmpresaType>({} as FormCadastroEmpresaType);

	const [novoCep, setCep] = useState<CepType>({} as CepType);
	const [uf, setUf] = useState<Array<EstadoType>>([]);
	const [cidades, setCidades] = useState<Array<CidadeType>>([]);

	const [treatedUf, setTreatedEstados] = useState<string[]>([]);
	const [treatedCidades, setTreatedCidades] = useState<string[]>([]);

	useEffect(() => {
		getUf();

		if (token) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		setForm({
			...formEmpresa,
			endereco: {
				cep: novoCep.cep,
				estado: novoCep.uf,
				cidade: novoCep.localidade,
				bairro: novoCep.bairro,
				logradouro: novoCep.logradouro,
			},
		});
	}, [novoCep]);

	useEffect(() => {
		form.setFieldsValue(formEmpresa);
	}, [form, formEmpresa]);

	useEffect(() => {
		const estado = uf.find(estado => estado.sigla == formEmpresa.endereco.estado);
		if (estado != undefined) {
			getCities(estado.id);
		}
	}, [formEmpresa.endereco?.estado]);

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
					console.log("teste");
					return Promise.resolve();
				}
				console.log("passou 2");
				return Promise.reject(new Error(t("pwd_not_match")));
			},
		}),
	];

	const getViaCep = async (cep: string) => {
		if (cep.length == 8) {
			try {
				const response = await getCep(cep);
				setCep({ ...response.data });
			} catch (e) {
				dispatch({ type: "SHOW_ERROR", payload: e });
			}
		}
	};

	const treatUf = (uf: Array<EstadoType>) => {
		const treatedEstados = uf.map(estado => {
			return estado.sigla;
		});
		setTreatedEstados([...treatedEstados]);
	};

	const treatCities = (cidades: Array<CidadeType>) => {
		const treatedCidades = cidades.map(cidade => {
			return cidade.nome;
		});
		setTreatedCidades([...treatedCidades]);
	};

	const getUf = async () => {
		const estados = await getEstados();
		setUf(estados.data);
		treatUf(estados.data);
	};

	const getCities = async (id: number) => {
		const cidades = await getCidades(id);
		treatCities(cidades.data);
	};

	const criarEmpresa = async () => {
		const novoFormEmpresa = { ...formEmpresa, avatar: getUrlImagem() };
		const { status } = await postEmpresa(novoFormEmpresa);
		if (status == 201) {
			navigate("/login");
			message.success(t("success_signup"));
		}
	};

	const handleOptionEstado = (value: string) => {
		setForm({ ...formEmpresa, ...{ endereco: { ...formEmpresa.endereco, estado: value } } });
	};

	const handleOptionCidade = (value: string) => {
		setForm({ ...formEmpresa, ...{ endereco: { ...formEmpresa.endereco, cidade: value } } });
	};

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" className={styles.boxLogin}>
				<Row
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Col>
						<LogoResumida width={90} />
					</Col>
					<Col className="welcome-text" style={{ bottom: "20px" }}>
						<h1>{t("singup_company")}</h1>
					</Col>
				</Row>
				<Form
					form={form}
					onFinish={criarEmpresa}
					name="cadastroEmpresa"
					onValuesChange={async (changedValues, allValues) => {
						if (changedValues.endereco) {
							setForm({
								...formEmpresa,
								endereco: { ...formEmpresa.endereco, ...changedValues.endereco },
							});
							return;
						}
						setForm({ ...formEmpresa, ...allValues, avatar: getUrlImagem() });
					}}
					style={{ width: "100%" }}
				>
					<Row className={styles.formCadastro}>
						<Row className={styles.formRowCadastro}>
							<ButtonUpload />
							<Form.Item>
								<Form.Item name="email" noStyle rules={RULES}>
									<Input
										label={t("email")}
										type={"email"}
										placeholder={t("email")}
										value={formEmpresa.email}
									/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="senha" noStyle rules={RULES}>
									<InputPassword
										label={t("type_password")}
										type={"password"}
										placeholder={t("password")}
										value={formEmpresa.senha}
										minLength={8}
									/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item
									name="repete-senha"
									noStyle
									rules={RULES_PASSWORD}
									dependencies={["senha"]}
								>
									<InputPassword
										label={t("type_repeat_password")}
										type={"password"}
										placeholder={t("password")}
										value={formEmpresa.senha}
										minLength={8}
									/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="razaoSocial" noStyle rules={RULES}>
									<Input
										label={t("social_purpose")}
										placeholder={t("social_purpose")}
										value={formEmpresa.razaoSocial}
									/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="nomeFantasia" noStyle rules={RULES}>
									<Input
										label={t("company_name")}
										placeholder={t("company_name")}
										value={formEmpresa.nomeFantasia}
									/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="cnpj" noStyle>
									<Input
										label={"Cnpj"}
										placeholder={"Cnpj"}
										value={formEmpresa.cnpj}
										minLength={14}
										maxLength={18}
									/>
								</Form.Item>
							</Form.Item>
						</Row>
						<Row className={styles.formRowCadastro}>
							<Form.Item>
								<Form.Item name={["endereco", "cep"]} noStyle>
									<Input
										label={t("zip_code")}
										placeholder={t("zip_code")}
										value={formEmpresa.endereco?.cep}
										maxLength={9}
										onChange={e => getViaCep(e.target.value)}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "estado"]} noStyle rules={RULES}>
									<InputSelect
										value={formEmpresa.endereco?.estado}
										choices={treatedUf}
										label={t("state")}
										change={handleOptionEstado}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "cidade"]} noStyle rules={RULES}>
									<InputSelect
										value={formEmpresa.endereco?.cidade}
										choices={treatedCidades}
										label={t("city")}
										change={handleOptionCidade}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "bairro"]} noStyle rules={RULES}>
									<Input
										label={t("district")}
										placeholder={t("district")}
										value={formEmpresa.endereco?.bairro}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "logradouro"]} noStyle rules={RULES}>
									<Input
										label={t("street_name")}
										placeholder={t("street_name")}
										value={formEmpresa.endereco?.logradouro}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "numero"]} noStyle>
									<InputNumber
										label={t("number")}
										placeholder={t("number")}
										value={formEmpresa.endereco?.numero}
										min={1}
									/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "complemento"]} noStyle>
									<Input
										label={t("complement")}
										placeholder={t("complement")}
										value={formEmpresa.endereco?.complemento}
									/>
								</Form.Item>
							</Form.Item>
						</Row>
					</Row>
					<Form.Item style={{ marginTop: "1rem" }}>
						<Row
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button htmlType="submit" type="primary" className={styles.btnLogin}>
								{t("singup")}
							</Button>
						</Row>
					</Form.Item>
				</Form>
				<Row justify="center" align="middle" style={{ width: "100%" }}>
					<p style={{ width: "100%" }}>
						{t("singup_as")} <Link to={"/cadastro/estudante"}>{t("student")}</Link>
					</p>
					<Row justify="center" align="middle" style={{ width: "100%" }}>
						<ButtonVoltar />
					</Row>
				</Row>
			</Row>
		</div>
	);
};

export default CadastroEmpresa;
