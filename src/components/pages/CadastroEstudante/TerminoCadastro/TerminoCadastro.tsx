import Button from "@/components/common/Button";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import Input from "@/components/common/Input";
import InputContato from "@/components/common/InputContato/InputContato";
import InputExperienciaProfissional from "@/components/common/InputExperienciaProfissional/InputExperienciaProfissional";
import InputHistoricoEscolar from "@/components/common/InputHistoricoEscolar";
import InputSelect from "@/components/common/InputSelect";
import SelectCompetencias from "@/components/common/SelectCompetencias/SelectCompetencias";
import ButtonUpload from "@/components/common/UploadCloudinary/ButtonUpload";
import { negateCadastroetp1 } from "@/redux/reducers/cadastro";
import { useAppDispatch, useAppSelector } from "@/redux/reducers/hooks";
import { getToken } from "@/services/autenticacao";
import { getCep } from "@/services/cep";
import { getCidades } from "@/services/cidades";
import { getCompetencias } from "@/services/competencias";
import { getEstados } from "@/services/estados";
import { postEstudante } from "@/services/estudante";
import { CepType } from "@/types/cepType";
import { CidadeType } from "@/types/cidadeType";
import { CompetenciaType } from "@/types/competenciaType";
import { EstadoType } from "@/types/estadoType";
import { experienciaProfissionalType } from "@/types/experienciaProfissionalType";
import { historicoEscolarType } from "@/types/historicoEscolarType";
import { CadastroEstudanteType } from "@/types/userTypes";
import { DatePicker, DatePickerProps, Form, message, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const TerminoCadastro = () => {
	const [form] = Form.useForm();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [token, setToken] = useState(getToken());

	const estudanteRedux: CadastroEstudanteType = useAppSelector(state => state.cadastro.estudante);
	const [novoEstudante, setEstudante] = useState<CadastroEstudanteType>({ ...estudanteRedux });
	const [novoCep, setCep] = useState<CepType>({} as CepType);
	const [competencias, setCompetencias] = useState<CompetenciaType[]>([]);

	const [uf, setUf] = useState<Array<EstadoType>>([]);
	const [cidades, setCidades] = useState<Array<CidadeType>>([]);

	const [treatedUf, setTreatedEstados] = useState<string[]>([]);
	const [treatedCidades, setTreatedCidades] = useState<string[]>([]);

	const dispatch = useAppDispatch();

	const getUrlImagem = () => {
		const srcImagem = document.querySelector("#uploadedImage")?.getAttribute("src");
		return srcImagem;
	};

	useEffect(() => {
		if (token) {
			navigate("/");
		}

		getUf();
		fetchCompetencias();
	}, []);

	useEffect(() => {
		const values = {
			...novoEstudante,
			dataNascimento: moment(novoEstudante.dataNascimento),
			avatar: getUrlImagem(),
		};
		form.setFieldsValue(values);
	}, [form, novoEstudante]);

	useEffect(() => {
		setEstudante({
			...novoEstudante,
			...{
				endereco: {
					...novoEstudante.endereco,
					estado: novoCep.uf,
					cidade: novoCep.localidade,
					bairro: novoCep.bairro,
					logradouro: novoCep.logradouro,
				},
			},
		});
	}, [novoCep]);

	useEffect(() => {
		const estado = uf.find(estado => estado.sigla == novoEstudante.endereco?.estado);
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
	};

	const datePasser: DatePickerProps["onChange"] = (date, dateString) => {
		setEstudante({ ...novoEstudante, ...{ dataNascimento: moment(date).format(dateFormatDto) } });
	};

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

	const handleOptionEstado = (value: string) => {
		setEstudante({
			...novoEstudante,
			...{ endereco: { ...novoEstudante.endereco, estado: value } },
		});
	};

	const handleOptionCidade = (value: string) => {
		setEstudante({
			...novoEstudante,
			...{ endereco: { ...novoEstudante.endereco, cidade: value } },
		});
	};

	const handleChange = (value: string[]) => {
		const cdCompetencias = value.map(competencia => {
			return { codCompetencia: Number(competencia) };
		});
		setEstudante({ ...novoEstudante, competencias: cdCompetencias });
	};

	const salvaEstudante = async (values: any) => {
		let body = {
			...novoEstudante,
			...values,
			...{ dataNascimento: moment(values.dataNascimento).format(dateFormatDto) },
			avatar: getUrlImagem(),
		};

		if (body.experienciaProfissional) {
			body.experienciaProfissional = body.experienciaProfissional.map(
				(experiencia: experienciaProfissionalType) => {
					return {
						...experiencia,
						dataFim: moment(experiencia.dataFim).format(dateFormatDto),
						dataInicio: moment(experiencia.dataInicio).format(dateFormatDto),
					};
				}
			);
		}

		if (body.historicoEscolar) {
			body.historicoEscolar = body.historicoEscolar.map((historico: historicoEscolarType) => {
				return {
					...historico,
					dataFim: moment(historico.dataFim).format(dateFormatDto),
					dataInicio: moment(historico.dataInicio).format(dateFormatDto),
				};
			});
		}

		try {
			postEstudante(body).then(res => {
				dispatch(negateCadastroetp1());

				if (res.status === 200) {
					navigate("/login");
					message.success(t("success_signup"));
				}
			});
		} catch (e) {
			dispatch({ type: "SHOW_ERROR", payload: e });
		}
	};

	const stateSetEstudante = (value: CadastroEstudanteType) => {
		setEstudante(value);
	};

	return (
		<div className={styles.containerGeral}>
			<Row justify="center" className={styles.boxLogin}>
				<span style={{ display: "none" }} id="auxImage" />
				<Row
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Row justify="center">
						<h2>{t("moreInfo")}</h2>
					</Row>
					<Form
						onFinish={salvaEstudante}
						form={form}
						name="cadastroEstudante"
						initialValues={novoEstudante}
						onValuesChange={(changedValues, allValues) => {
							setEstudante({
								...novoEstudante,
								avatar: getUrlImagem(),
							});
							if (changedValues.endereco) {
								setEstudante({
									...novoEstudante,
									endereco: { ...novoEstudante.endereco, ...changedValues.endereco },
								});
								return;
							}
							if (changedValues.experienciaProfissional) {
								if (!novoEstudante.experienciaProfissional) {
									setEstudante({ ...novoEstudante, ...changedValues });
									return;
								}

								if (
									changedValues.experienciaProfissional.length <
									novoEstudante.experienciaProfissional.length
								) {
									setEstudante({ ...novoEstudante, ...changedValues });
									return;
								}

								let newHistorico = novoEstudante.experienciaProfissional;
								let objectHistorico =
									newHistorico[changedValues.experienciaProfissional.length - 1];
								newHistorico[changedValues.experienciaProfissional.length - 1] = {
									...objectHistorico,
									...changedValues.experienciaProfissional[
										changedValues.experienciaProfissional.length - 1
									],
								};
								setEstudante({ ...novoEstudante, experienciaProfissional: newHistorico });
								return;
							}
							if (changedValues.historicoEscolar) {
								if (!novoEstudante.historicoEscolar) {
									setEstudante({ ...novoEstudante, ...changedValues });
									return;
								}

								if (changedValues.historicoEscolar.length < novoEstudante.historicoEscolar.length) {
									setEstudante({ ...novoEstudante, ...changedValues });
									return;
								}

								let newHistorico = novoEstudante.historicoEscolar;
								let objectHistorico = newHistorico[changedValues.historicoEscolar.length - 1];
								newHistorico[changedValues.historicoEscolar.length - 1] = {
									...objectHistorico,
									...changedValues.historicoEscolar[changedValues.historicoEscolar.length - 1],
								};
								setEstudante({ ...novoEstudante, historicoEscolar: newHistorico });
								return;
							}

							if (!changedValues.dataNascimento) {
								setEstudante({ ...novoEstudante, ...changedValues });
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
							<Form.Item name="cpf" noStyle rules={[...RULES]}>
								<Input
									label="CPF"
									placeholder={"CPF"}
									value={novoEstudante.cpf}
									minLength={11}
									maxLength={14}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item
								name="rg"
								noStyle
								rules={[
									...RULES,
									{ required: true, pattern: new RegExp(/\d+/g), message: t("only_numbers") },
								]}
							>
								<Input label="RG" placeholder={"RG"} value={novoEstudante.rg} maxLength={11} />
							</Form.Item>
						</Form.Item>

						<ButtonUpload />

						<Form.Item>
							<span style={{ display: "block", textAlign: "start" }}>{t("birth_date")}</span>
							<Form.Item name="dataNascimento" noStyle rules={RULES}>
								<DatePicker
									style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
									name="dataNascimento"
									placeholder={t("birth_date")}
									onChange={datePasser}
									defaultValue={
										novoEstudante.dataNascimento ? moment(novoEstudante.dataNascimento) : moment()
									}
									format={dateFormat}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item name={["endereco", "cep"]} noStyle>
								<Input
									label={t("zip_code")}
									placeholder={t("zip_code")}
									value={novoEstudante.endereco?.cep}
									maxLength={8}
									onChange={e => getViaCep(e.target.value)}
								/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "estado"]} noStyle rules={RULES}>
								<InputSelect
									value={novoEstudante.endereco?.estado}
									choices={treatedUf}
									label={t("state")}
									change={handleOptionEstado}
								/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "cidade"]} noStyle rules={RULES}>
								<InputSelect
									value={novoEstudante.endereco?.cidade}
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
									value={novoEstudante.endereco?.bairro}
									maxLength={14}
								/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "logradouro"]} noStyle rules={RULES}>
								<Input
									label={t("street_name")}
									placeholder={t("street_name")}
									value={novoEstudante.endereco?.logradouro}
									maxLength={14}
								/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item
								name={["endereco", "numero"]}
								noStyle
								rules={[
									{ required: false, pattern: new RegExp(/\d+/g), message: t("only_numbers") },
								]}
							>
								<Input
									label={t("number")}
									placeholder={t("number")}
									value={novoEstudante.endereco?.numero}
									maxLength={14}
								/>
							</Form.Item>
						</Form.Item>
						<Form.Item>
							<Form.Item name={["endereco", "complemento"]} noStyle>
								<Input
									label={t("complement")}
									placeholder={t("complement")}
									value={novoEstudante.endereco?.complemento}
									defaultValue={""}
									maxLength={14}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item name={["competencias"]} noStyle rules={RULES}>
								<SelectCompetencias
									label="Soft-Skills"
									choices={competencias}
									function={handleChange}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item>
								<InputExperienciaProfissional labelGeral={t("professionalExp")} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item>
								<InputHistoricoEscolar
									labelGeral={t("studentHistoric")}
									estudante={novoEstudante}
									state={stateSetEstudante}
									form={form}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Form.Item rules={[...RULES]}>
								<InputContato estudante={novoEstudante} state={stateSetEstudante} />
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
								<Button htmlType="submit" type="primary" className={styles.btnLogin}>
									{t("singup")}
								</Button>
							</Row>
						</Form.Item>
					</Form>
					<Row justify="center" align="middle" style={{ width: "100%" }}>
						<p style={{ width: "100%" }}>
							<span style={{ flex: "1" }}>
								{t("singup_as")} <Link to={"/cadastro/empresa"}>{t("company")}</Link>
							</span>
						</p>
						<Row justify="center" align="middle" style={{ width: "100%" }}>
							<ButtonVoltar onClick={() => dispatch(negateCadastroetp1())} />
						</Row>
					</Row>
				</Row>
			</Row>
		</div>
	);
};

export default TerminoCadastro;
