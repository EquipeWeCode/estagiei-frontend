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
import {CadastroEmpresaType} from "@/types/empresaTypes";
import styles from "./styles.module.scss";
import { ReactComponent as LogoResumida } from "@/assets/logo-resumida.svg";
import { EnderecoType } from "@/types/enderecoType";

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
	const { t } = useTranslation();

	const [token, setToken] = useState(getToken());

	const [formEmpresa, setForm] = useState<FormCadastroEmpresaType>({} as FormCadastroEmpresaType);
	const [novoCep, setCep] = useState<CepType>({} as CepType);

	useEffect(() => {
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
		console.log(formEmpresa);
	}, [formEmpresa])
 
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
				console.log(e);
			}
		}
	}

	const criarEmpresa = async () => {
		try {
			await postEmpresa(formEmpresa);
			// navigate('/');
		}
		catch(e) {
			// navigate('/');
		}
	};

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
						onFinish={criarEmpresa}
						name="cadastroEmpresa"
						onValuesChange={async (changedValues, allValues) => {
							setForm({...formEmpresa, ...changedValues});
						}}
						style={{width:"100%"}}
					>	
					<Row className={styles.formCadastro}>
						<Row className={styles.formRowCadastro}>
							<Form.Item>
								<span>Email</span>
								<Form.Item name="email" noStyle rules={RULES}>
									<Input type={"email"} placeholder={"email"} value={formEmpresa.email}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<span>Senha</span>
								<Form.Item name="senha" noStyle rules={RULES}>
									<Input type={"password"} placeholder={"senha"} value={formEmpresa.senha} maxLength={14} minLength={8}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<span>Repetir a senha</span>
								<Form.Item name="repete-senha" noStyle rules={RULES_PASSWORD} dependencies={['senha']}>
									<Input type={"password"} placeholder={"senha"} value={formEmpresa.senha} maxLength={14} minLength={8}/>
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<span>{"Razao social"}</span>
								<Form.Item name="razaoSocial" noStyle rules={RULES}>
									<Input placeholder={t("name")} value={formEmpresa.razaoSocial} />
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<span>{"Nome fantasia"}</span>
								<Form.Item name="nomeFantasia" noStyle rules={RULES}>
									<Input placeholder={t("name")} value={formEmpresa.nomeFantasia} />
								</Form.Item>
							</Form.Item>

							<Form.Item>
								<span>CNPJ</span>
								<Form.Item name="cnpj" noStyle rules={RULES}>
									<Input placeholder={"cnpj"} value={formEmpresa.cnpj} maxLength={14} />
								</Form.Item>
							</Form.Item>
						</Row>
						<Row className={styles.formRowCadastro}>
							{/* <Form.Item name="endereco">
									<Form.Item>
										<span>CEP</span>
										<Form.Item name="cep" noStyle rules={RULES}>
											<Input placeholder={"cep"} value={formEmpresa.endereco.cep} maxLength={8} onChange={e => getViaCep(e.target.value)}/>
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Estado</span>
										<Form.Item name="estado" noStyle rules={RULES}>
											<Input placeholder={"estado"} value={formEmpresa.endereco.estado} maxLength={14} />
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Cidade</span>
										<Form.Item name="cidade" noStyle rules={RULES}>
											<Input placeholder={"cidade"} value={formEmpresa.endereco.cidade} maxLength={14} />
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Bairro</span>
										<Form.Item name="bairro" noStyle rules={RULES}>
											<Input placeholder={"bairro"} value={formEmpresa.endereco.bairro} maxLength={14} />
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Logradouro</span>
										<Form.Item name="logradouro" noStyle rules={RULES}>
											<Input placeholder={"logradouro"} value={formEmpresa.endereco.logradouro} maxLength={14} />
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Numero</span>
										<Form.Item name="numero" noStyle rules={RULES}>
											<Input placeholder={"numero"} value={formEmpresa.endereco.numero} maxLength={14} />
										</Form.Item>
									</Form.Item>
									<Form.Item>
										<span>Complemento</span>
										<Form.Item name="complemento" noStyle>
											<Input placeholder={"complemento"} value={formEmpresa.endereco.complemento} maxLength={14} />
										</Form.Item>
									</Form.Item>
								
									<Form.Item>
										<span>Ponto de referencia</span>
										<Form.Item name="pontoReferencia" noStyle>
											<Input placeholder={"Ponto de referencia"} value={formEmpresa.endereco.complemento} maxLength={14} />
										</Form.Item>
									</Form.Item>
							</Form.Item> */}
						</Row>	
					</Row>
						<Form.Item style={{ marginTop: "1rem" }}>
							<Row style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
								<Button htmlType="submit" type="primary" className={styles.btnLogin}>
									{t("save")}
								</Button>
								<Button style={{ backgroundColor: "#000", color: "#FFF", top:"10px" }} >
									<Link to={"/"}>{t("go_back")}</Link>
								</Button>
							</Row>
						</Form.Item>
					</Form>
					<Row>
						<span>Cadastre-se como <Link to={"/cadastro/estudante"}>estudante</Link></span>
					</Row>
			</Row>
		</div>
	);
};

export default CadastroEmpresa;