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
import { negateCadastroetp1, negateCadastroetp2, setState } from "@/redux/reducers/cadastro";
import type { DatePickerProps } from "antd";
import { CepType } from "@/types/cepType";
import { getCep } from "@/services/cep";
import { PlusOutlined } from "@ant-design/icons";

const TerminoCadastro = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [token, setToken] = useState(getToken());

	const novoEstudante: CadastroEstudanteType = useAppSelector(state => state.cadastro.estudante);
	const [novoCep, setCep] = useState<CepType>({} as CepType);
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

	const datePasser: DatePickerProps['onChange'] = (date, dateString) => {
		dispatch(setState({ ...novoEstudante, ...{dataNascimento: moment(dateString, dateFormat).format(dateFormatDto)}}));
	}

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

	useEffect(() => {
		dispatch(setState({...novoEstudante, endereco: {
			estado: novoCep.uf,
			cidade: novoCep.localidade,
			bairro: novoCep.bairro,
			logradouro: novoCep.logradouro,
		}}))
	}, [novoCep])

	useEffect(() => {
		console.log(novoEstudante)
	}, [novoEstudante])

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" className={styles.boxLogin}>
				<Row style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
					<Row justify="center">
						<h2>Precisamos de mais algumas informações para completar seu cadastro</h2>
					</Row>
					<Form
						onFinish={() => {dispatch(negateCadastroetp2())}}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							if (!changedValues.dataNascimento) {
								dispatch(setState({...novoEstudante, ...changedValues}))
							}
						}}
						className={styles.containerInput}
					>
						<Form.Item>
							<Form.Item name="nome" noStyle rules={RULES}>
								<Input label={t("name")} placeholder={t("name")} value={novoEstudante.nome} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>CPF</span>
							<Form.Item name="cpf" noStyle rules={RULES}>
								<Input placeholder={"CPF"} value={novoEstudante.cpf} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>RG</span>
							<Form.Item name="rg" noStyle rules={RULES}>
								<Input placeholder={"RG"} value={novoEstudante.rg} maxLength={12} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("birth_date")}</span>
							<Form.Item name="dataNascimento" noStyle rules={RULES}>
								<DatePicker
									style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
									name="dataNascimento"
									placeholder={t("birth_date")}
									onChange={datePasser}
									format={dateFormat}
								/>
							</Form.Item>
						</Form.Item>

						{/* <Form.Item>
							<span>{t("education")}</span>
							<Form.Item name="instEnsino" noStyle>
								<Input placeholder={t("education")} value={novoEstudante.instEnsino} />
							</Form.Item>
						</Form.Item> */}

						{/* <Form.Item>
							<span>{t("skills")}</span>
							<Form.Item noStyle>
								<Select
									showArrow
									mode="multiple"
									value={novoEstudante.competencias?.map(competencia => competencia.codCompetencia)}
									placeholder={t("skills")}
									onChange={(value: (number | undefined)[] | undefined) => {
										dispatch(setState({type: "set", payload: competencias: value && value.map(codCompetencia => ({ codCompetencia }))});
									}}
								>
									{novoEstudante.competencias &&
										novoEstudante.competencias.map(competencia => (
											<Select.Option
												key={competencia.codCompetencia}
												value={competencia.codCompetencia}
											>
												{undefined}
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Form.Item> */}

						<Form.Provider>
							<Form.Item>
								<span>CEP</span>
								<Form.Item name={['endereco', 'cep']} noStyle rules={RULES}>
									<Input placeholder={"cep"} value={novoEstudante.endereco?.cep} maxLength={8} onChange={e => getViaCep(e.target.value)}/>
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Estado</span>
								<Form.Item noStyle rules={RULES}>
									<Input placeholder={"estado"} value={novoEstudante.endereco?.estado} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Cidade</span>
								<Form.Item noStyle rules={RULES}>
									<Input placeholder={"cidade"} value={novoEstudante.endereco?.cidade} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Bairro</span>
								<Form.Item noStyle rules={RULES}>
									<Input placeholder={"bairro"} value={novoEstudante.endereco?.bairro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Logradouro</span>
								<Form.Item noStyle rules={RULES}>
									<Input placeholder={"logradouro"} value={novoEstudante.endereco?.logradouro} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Numero</span>
								<Form.Item name={['endereco', 'numero']} noStyle rules={RULES}>
									<Input placeholder={"numero"} value={novoEstudante.endereco?.numero} maxLength={14} />
								</Form.Item>
							</Form.Item>
							<Form.Item>
								<span>Complemento</span>
								<Form.Item name={['endereco', 'complemento']} noStyle>
									<Input placeholder={"complemento"} value={novoEstudante.endereco?.complemento} maxLength={14} />
								</Form.Item>
							</Form.Item>
						
							<Form.Item>
								<span>Ponto de referencia</span>
								<Form.Item name={['endereco', 'pontoReferencia']} noStyle>
									<Input placeholder={"Ponto de referencia"} value={novoEstudante.endereco?.complemento} maxLength={14} />
								</Form.Item>
							</Form.Item>
						</Form.Provider>
						
						<span>Experiência Profissional</span>



						<Form.Item>
							<Button type="dashed" onClick={() => {}} block icon={<PlusOutlined />}>
								Add sights
							</Button>
						</Form.Item>

						<Form.Item style={{ marginTop: "1rem" }}>
							<Button htmlType="submit" type="primary">
								{t("singup")}
							</Button>
						</Form.Item>

						<Row justify="center" align="middle" style={{ width: "100%", marginBottom: "20px" }}>
							<span>Cadastre-se como <Link to={"/cadastro/empresa"}>empresa</Link></span>
						</Row>

						<Button style={{ marginRight: "2rem", backgroundColor: "#000", color: "#FFF" }} onClick={() => {dispatch(negateCadastroetp1())}}>
								{t("go_back")}
						</Button>
					</Form>
				</Row>
			</Row>
		</div>
	);
};

export default TerminoCadastro;