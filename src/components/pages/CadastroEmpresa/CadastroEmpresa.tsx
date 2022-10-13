import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Col, Space } from "antd";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, putEstudante } from "@/services/estudante";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "@/services/autenticacao";
import Button from "@/components/common/Button";
import { EmpresaLoginType, EmpresaType } from "@/types/empresaTypes";
import { getEmpresa, postEmpresa } from "@/services/empresa";
import Notification from "@/components/common/Notification";
import { use } from "i18next";
import { CepType } from "@/types/cepType";
import { getCep } from "@/services/cep";
import { EnderecoType } from "@/types/enderecoType";
import {CadastroEmpresaType} from "@/types/empresaTypes";

type FormCadastroEmpresaType = {
	email?: string,
	senha?: string,
	repete_senha?: string,
	razaoSocial?: string,
	nomeFantasia?: string,
	cnpj?: string,
	cep?: string,
	estado?: string,
	cidade?: string,
	bairro?: string,
	logradouro?: string,
	numero?: string,
	complemento?: string,
	pontoReferencia?: string
}

const CadastroEmpresa = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [token, setToken] = useState(getToken());

	const [novaEmpresa, setNovaEmpresa] = useState<CadastroEmpresaType>({} as CadastroEmpresaType);
	const [formEmpresa, setForm] = useState<FormCadastroEmpresaType>({} as FormCadastroEmpresaType);
	const [novoCep, setCep] = useState<CepType>({} as CepType);

	const [finished, setFinished] = useState<boolean>(false);

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		setForm({...formEmpresa, 
			cep: novoCep.cep,
			estado: novoCep.uf,
			cidade: novoCep.localidade,
			bairro: novoCep.bairro,
			logradouro: novoCep.logradouro,
		})
	}, [novoCep]);

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

	const transferData = () => {
		setNovaEmpresa({
			email: formEmpresa.email,
			senha: formEmpresa.senha,
			avatar: "https://dummyimage.com/600x400/000/fff&text=company",
			razaoSocial: formEmpresa.razaoSocial,
			nomeFantasia: formEmpresa.nomeFantasia,
			cnpj: formEmpresa.cnpj,
			endereco: {
				cep: formEmpresa.cep,
				estado: formEmpresa.estado,
				cidade: formEmpresa.cidade,
				bairro: formEmpresa.bairro,
				logradouro: formEmpresa.logradouro,
				numero: formEmpresa.numero,
				complemento: formEmpresa.complemento,
				pontoReferencia: formEmpresa.pontoReferencia
			}
		})
	}

	const criarEmpresa = async () => {
		await transferData();
		console.log(novaEmpresa)
		try {
			await postEmpresa(novaEmpresa);
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
						name="cadastroEmpresa"
						onValuesChange={async (changedValues, allValues) => {
								setForm({...formEmpresa, ...changedValues});
						}}
					>
						<Form.Item>
							<span>{"Email"}</span>
							<Form.Item name="email" noStyle rules={RULES}>
								<Input type={"email"} placeholder={"email"} value={formEmpresa.email} />
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

						<Form.Item>
							<span>CEP</span>
							<Form.Item name="cep" noStyle rules={RULES}>
								<Input placeholder={"cep"} value={formEmpresa.cep} maxLength={8} onChange={e => getViaCep(e.target.value)}/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Estado</span>
							<Form.Item noStyle rules={RULES}>
								<Input placeholder={"estado"} value={formEmpresa.estado} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Cidade</span>
							<Form.Item noStyle rules={RULES}>
								<Input placeholder={"cidade"} value={formEmpresa.cidade} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Bairro</span>
							<Form.Item noStyle rules={RULES}>
								<Input placeholder={"bairro"} value={formEmpresa.bairro} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Logradouro</span>
							<Form.Item noStyle rules={RULES}>
								<Input placeholder={"logradouro"} value={formEmpresa.logradouro} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Numero</span>
							<Form.Item name="numero" noStyle rules={RULES}>
								<Input placeholder={"numero"} value={formEmpresa.numero} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<span>Complemento</span>
							<Form.Item name="complemento" noStyle>
								<Input placeholder={"complemento"} value={formEmpresa.complemento} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>Ponto de referencia</span>
							<Form.Item name="pontoReferencia" noStyle>
								<Input placeholder={"Ponto de referencia"} value={formEmpresa.complemento} maxLength={14} />
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
