import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { Form, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "@/services/autenticacao";
import Button from "@/components/common/Button";
import { postEmpresa } from "@/services/empresa";
import Notification from "@/components/common/Notification";
import { CepType } from "@/types/cepType";
import { getCep } from "@/services/cep";
import styles from "./styles.module.scss";
import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import { EnderecoType } from "@/types/enderecoType";
import InputSelect from "@/components/common/InputSelect/InputSelect";
import { useSelector } from "react-redux";
import { CidadeType } from "@/types/cidadeType";
import { EstadoType } from "@/types/estadoType";
import { getCidades } from "@/services/cidades";
import { getEstados } from "@/services/estados";
import { useDispatch } from "react-redux";
import { InputPassword } from "@/components/common/Input/Input";

type FormCadastroEmpresaType = {
	email?: string,
	senha?: string,
	razaoSocial?: string,
	nomeFantasia?: string,
	cnpj?: string,
	endereco: EnderecoType
}

const CadastroEmpresa = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const message = useSelector((state: any) => state.message);
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
		setForm({...formEmpresa, endereco: {
				cep: novoCep.cep,
				estado: novoCep.uf,
				cidade: novoCep.localidade,
				bairro: novoCep.bairro,
				logradouro: novoCep.logradouro,
			}
		})
	}, [novoCep]);

	useEffect(() => {
		form.setFieldsValue(formEmpresa)
	}, [form, formEmpresa]);

	useEffect(() => {
		const estado = uf.find((estado) => estado.sigla == formEmpresa.endereco.estado);
		if (estado != undefined) {
			getCities(estado.id);
		}
	}, [formEmpresa.endereco?.estado]);

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
	]

	const getViaCep = async (cep: string) => {
		if (cep.length == 8) {
			try {
				const response = await getCep(cep)
				setCep({...response.data})
			}
			catch(e) {
				dispatch({type: "SHOW_ERROR", payload: e});
			}
		}
	}

	const treatUf = (uf: Array<EstadoType>) => {
		const treatedEstados = uf.map((estado) => {return estado.sigla});
		setTreatedEstados([...treatedEstados]);
	}	

	const treatCities = (cidades: Array<CidadeType>) => {
		const treatedCidades = cidades.map((cidade) => {return cidade.nome});
		setTreatedCidades([...treatedCidades]);
	}

	const getUf = async () => {
		const estados = await getEstados();
		setUf(estados.data);
		treatUf(estados.data);
	}

	const getCities = async (id: number) => {
		const cidades = await getCidades(id);
		treatCities(cidades.data);
	}

	const criarEmpresa = async () => {
		try {
			await postEmpresa(formEmpresa);
			navigate('/login');
		}
		catch(e) {
			dispatch({type: "SHOW_ERROR", payload: e});
		}
	};

	const handleOptionEstado = (value: string) => {
		setForm({...formEmpresa, ...{endereco: {...formEmpresa.endereco, estado: value}}})
	}

	const handleOptionCidade = (value: string) => {
		setForm({...formEmpresa, ...{endereco: {...formEmpresa.endereco, cidade: value}}})
	}

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" className={styles.boxLogin}>
				<Row style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
					<Col>
						<LogoResumida width={90} />
					</Col>
					<Col className="welcome-text" style={{bottom: "20px"}}>
						<h1>
							{t("singup_company")}
						</h1>
					</Col>
				</Row>
					<Form
						form={form}
						onFinish={criarEmpresa}
						name="cadastroEmpresa"
						onValuesChange={async (changedValues, allValues) => {
							if (changedValues.endereco) {
								setForm({...formEmpresa, endereco: {...formEmpresa.endereco, ...changedValues.endereco}});
								return
							}
							if (changedValues['repete-senha']) {
								return
							}						
							setForm({...formEmpresa, ...changedValues});
						}}
						style={{width:"100%"}}
					>	
					<Row className={styles.formCadastro}>
						<Row className={styles.formRowCadastro}>
							<Form.Item>
								<Form.Item name="email" noStyle rules={RULES}>
									<Input label={t("email")} type={"email"} placeholder={t("email")} value={formEmpresa.email}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="senha" noStyle rules={RULES}>
									<InputPassword label={t("type_password")} type={"password"} placeholder={t("password")} value={formEmpresa.senha} maxLength={14} minLength={8}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="repete-senha" noStyle rules={RULES_PASSWORD} dependencies={['senha']}>
									<InputPassword label={t("type_repeat_password")} type={"password"} placeholder={t("password")} value={formEmpresa.senha} maxLength={14} minLength={8}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="razaoSocial" noStyle rules={RULES}>
									<Input label={t("social_purpose")} placeholder={t("name")} value={formEmpresa.razaoSocial} />
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="nomeFantasia" noStyle rules={RULES}>
									<Input label={t("company_name")} placeholder={t("name")} value={formEmpresa.nomeFantasia} />
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<Form.Item name="cnpj" noStyle rules={RULES}>
									<Input label={"Cnpj"} placeholder={"Cnpj"} value={formEmpresa.cnpj} maxLength={14} />
								</Form.Item>
							</Form.Item>
						</Row>
						<Row className={styles.formRowCadastro}>
							<Form.Item>
								<Form.Item name={["endereco", "cep"]} noStyle rules={RULES}>
									<Input label={t("zip_code")} placeholder={t("zip_code")} value={formEmpresa.endereco?.cep} maxLength={8} onChange={e => getViaCep(e.target.value)}/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "estado"]} noStyle rules={RULES}>
									<InputSelect value={formEmpresa.endereco?.estado} choices={treatedUf} label={t("state")} change={handleOptionEstado}/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "cidade"]} noStyle rules={RULES}>
									<InputSelect value={formEmpresa.endereco?.cidade} choices={treatedCidades} label={t("city")} change={handleOptionCidade}/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "bairro"]} noStyle rules={RULES}>
									<Input label={t("district")} placeholder={t("district")} value={formEmpresa.endereco?.bairro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "logradouro"]} noStyle rules={RULES}>
									<Input label={t("street_name")} placeholder={t("street_name")} value={formEmpresa.endereco?.logradouro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "numero"]} noStyle rules={RULES}>
									<Input label={t("number")} placeholder={t("number")} value={formEmpresa.endereco?.numero} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<Form.Item name={["endereco", "complemento"]} noStyle>
									<Input label={t("complement")} placeholder={t("complement")} value={formEmpresa.endereco?.complemento} maxLength={14} />
								</Form.Item>
							</Form.Item>
						</Row>	
					</Row>
						<Form.Item style={{ marginTop: "1rem" }}>
							<Row style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
								<Button htmlType="submit" type="primary" className={styles.btnLogin}>
									{t("singup")}
								</Button>
							</Row>
						</Form.Item>
					</Form>
					<Row justify="center" align="middle" style={{ width: "100%" }}>
						<p style={{width: "100%"}}>{t("singup_as")} <Link to={"/cadastro/estudante"}>{t("student")}</Link></p>
						<Row justify="center" align="middle" style={{ width: "100%" }}>
							<Button secondary onClick={() => navigate("/")}>
								{t("go_back")}
							</Button>
						</Row>
					</Row>
			</Row>
		</div>
	);
};

export default CadastroEmpresa;
