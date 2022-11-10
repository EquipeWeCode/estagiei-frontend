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
import { negateCadastroetp1, setState } from "@/redux/reducers/cadastro";
import type { DatePickerProps } from "antd";
import { CepType } from "@/types/cepType";
import { getCep } from "@/services/cep";
import { PlusOutlined } from "@ant-design/icons";
import InputSelect from "@/components/common/InputSelect";
import { EstadoType } from "@/types/estadoType";
import { CidadeType } from "@/types/cidadeType";
import { getEstados } from "@/services/estados";
import { getCidades } from "@/services/cidades";
import InputExperienciaProfissional from "@/components/common/InputExperienciaProfissional/InputExperienciaProfissional";
import { SelectProps } from "antd";
import SelectCompetencias from "@/components/common/SelectCompetencias/SelectCompetencias";
import InputHistoricoEscolar from "@/components/common/InputHistoricoEscolar";
import InputContato from "@/components/common/InputContato/InputContato";
import { historicoEscolarType } from "@/types/historicoEscolarType";

const TerminoCadastro = () => {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [token, setToken] = useState(getToken());

	const estudanteRedux: CadastroEstudanteType = useAppSelector(state => state.cadastro.estudante);
	const [novoEstudante, setEstudante] = useState<CadastroEstudanteType>({...estudanteRedux});
	const [novoCep, setCep] = useState<CepType>({} as CepType);
	const [competencias, setCompetencias] = useState<CompetenciaType[]>([]);

	const [uf, setUf] = useState<Array<EstadoType>>([]);
	const [cidades, setCidades] = useState<Array<CidadeType>>([]);

	const [treatedUf, setTreatedEstados] = useState<string[]>([]);
	const [treatedCidades, setTreatedCidades] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (token) {
			navigate("/");
		}

		getUf();
		fetchCompetencias();
	}, []);

	useEffect(() => {
		console.log(novoEstudante);
	}, [novoEstudante]);

	useEffect(() => {
		const values = {...novoEstudante, dataNascimento: moment(novoEstudante.dataNascimento)}
		form.setFieldsValue(values);
	}, [form, novoEstudante]);

	useEffect(() => {
		setEstudante({...novoEstudante, ...{endereco: {
				...novoEstudante.endereco,
				estado: novoCep.uf,
				cidade: novoCep.localidade,
				bairro: novoCep.bairro,
				logradouro: novoCep.logradouro,
			}}
		});
	}, [novoCep])

	useEffect(() => {
		const estado = uf.find((estado) => estado.sigla == novoEstudante.endereco?.estado);
		if (estado != undefined) {
			getCities(estado.id);
		}
	}, [novoEstudante.endereco?.estado]);

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const fetchCompetencias = async () => {
		const competencias = await getCompetencias();
		setCompetencias([...competencias.data]);
	}

	const datePasser: DatePickerProps['onChange'] = (date, dateString) => {
		setEstudante({...novoEstudante, ...{dataNascimento: moment(date).format(dateFormatDto)}} );
	}

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

	const handleOptionEstado = (value: string) => {
		setEstudante({...novoEstudante, ...{endereco: {...novoEstudante.endereco, estado: value}}});
	}

	const handleOptionCidade = (value: string) => {
		setEstudante({...novoEstudante, ...{endereco: {...novoEstudante.endereco, cidade: value}}});
	}

	const handleChange = (value: string[]) => {
		const cdCompetencias = value.map((competencia) => {return {codCompetencia: Number(competencia)}})
		setEstudante({...novoEstudante, competencias: cdCompetencias});
	};

	const salvaEstudante = async (values: any) => {		
		console.log(values);
		// try {
		// 	postEstudante(novoEstudante).then((res) => {
		// 		dispatch(negateCadastroetp1());
		// 		navigate("/");
		// 	})
		// }
		// catch (e) {
		// 	dispatch({type: "SHOW_ERROR", payload: e});
		// }
	};

	const stateSetEstudante = (value: CadastroEstudanteType) => {
		setEstudante(value);
	}

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" className={styles.boxLogin}>
				<Row style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
					<Row justify="center">
						<h2>Precisamos de mais algumas informações para completar seu cadastro</h2>
					</Row>
					<Form
						onFinish={salvaEstudante}
						form={form}
						name="cadastroEstudante"
						initialValues={novoEstudante}
						onValuesChange={(changedValues, allValues) => {
							if (changedValues.endereco) {
								setEstudante({...novoEstudante, endereco: {...novoEstudante.endereco, ...changedValues.endereco}});
								return;
							}
							if (changedValues.experienciaProfissional) {
								if (!novoEstudante.experienciaProfissional) {
									setEstudante({...novoEstudante, ...changedValues});
									return;
								}
							
								let newHistorico = novoEstudante.experienciaProfissional;
								let objectHistorico = newHistorico[changedValues.experienciaProfissional.length - 1]
								newHistorico[changedValues.experienciaProfissional.length - 1] = {...objectHistorico, ...changedValues.experienciaProfissional[changedValues.experienciaProfissional.length - 1]}
								setEstudante({...novoEstudante, experienciaProfissional: newHistorico});
								return;
							}
							if (changedValues.historicoEscolar) {
								if (!novoEstudante.historicoEscolar) {
									setEstudante({...novoEstudante, ...changedValues});
									return;
								}
							
								let newHistorico = novoEstudante.historicoEscolar;
								let objectHistorico = newHistorico[changedValues.historicoEscolar.length - 1]
								newHistorico[changedValues.historicoEscolar.length - 1] = {...objectHistorico, ...changedValues.historicoEscolar[changedValues.historicoEscolar.length - 1]}
								setEstudante({...novoEstudante, historicoEscolar: newHistorico});
								return;
							}

							if (!changedValues.dataNascimento) {
								setEstudante({...novoEstudante, ...changedValues});
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

						<Form.Item>
							<Form.Item name={["endereco", "cep"]} noStyle rules={RULES}>
								<Input label={t("zip_code")} placeholder={t("zip_code")} value={novoEstudante.endereco?.cep} maxLength={8} onChange={e => getViaCep(e.target.value)}/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "estado"]} noStyle rules={RULES}>
								<InputSelect value={novoEstudante.endereco?.estado} choices={treatedUf} label={t("state")} change={handleOptionEstado}/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "cidade"]} noStyle rules={RULES}>
								<InputSelect value={novoEstudante.endereco?.cidade} choices={treatedCidades} label={t("city")} change={handleOptionCidade}/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "bairro"]} noStyle rules={RULES}>
								<Input label={t("district")} placeholder={t("district")} value={novoEstudante.endereco?.bairro} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "logradouro"]} noStyle rules={RULES}>
								<Input label={t("street_name")} placeholder={t("street_name")} value={novoEstudante.endereco?.logradouro} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "numero"]} noStyle rules={RULES}>
								<Input label={t("number")} placeholder={t("number")} value={novoEstudante.endereco?.numero} maxLength={14} />
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "complemento"]} noStyle>
								<Input label={t("complement")} placeholder={t("complement")} value={novoEstudante.endereco?.complemento} defaultValue={""} maxLength={14} />
							</Form.Item>
						</Form.Item>
						
						{/* <span>Experiência Profissional</span>
						<Form.List name="experienciaProfissional">
							{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
								<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
									<Form.Item {...restField} name={[name, 'first']} rules={[{ required: true, message: 'Missing first name' }]}>
										<Input placeholder="First Name" />
									</Form.Item>
									<Form.Item {...restField} name={[name, 'last']} rules={[{ required: true, message: 'Missing last name' }]}>
										<Input placeholder="Last Name" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
								))}
							</>
							)}
						</Form.List>
						<Form.Item>
							<Button type="dashed" onClick={() => {add()}} block icon={<PlusOutlined />}>
								Add sights
							</Button>
						</Form.Item> */}

						<Form.Item>
							<Form.Item name={["competencias"]} noStyle rules={RULES}>
								<SelectCompetencias label="Competencias" choices={competencias} function={handleChange}/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item>
								<InputExperienciaProfissional labelGeral="Experiencia profissional"/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item>
								<InputHistoricoEscolar labelGeral="Histórico escolar" estudante={novoEstudante} state={stateSetEstudante} form={form}/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item rules={[...RULES]}>
								<InputContato estudante={novoEstudante} state={stateSetEstudante}/>
							</Form.Item>
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
