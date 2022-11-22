import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Group, InputNumber, Search } from "@/components/common/Input/Input";
import SelectEstados from "@/components/common/select-estados";
import { nvlEscolaridadeEnum } from "@/constants/enums";
import { useAuth } from "@/contexts/auth";
import { getCompetencias } from "@/services/competencias";
import { getCEP, getCidades } from "@/services/endereco";
import { putEstudante } from "@/services/estudante";
import { CompetenciaType } from "@/types/competenciaType";
import { UserType } from "@/types/userTypes";
import { getEnumConstant } from "@/utils/selects";
import { DatePicker, Divider, Form, message, Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type EdicaoEstudanteProps = {
	user: UserType;
	posSalvarEstudante: () => void;
};

const EdicaoEstudante = (props: EdicaoEstudanteProps) => {
	const { posSalvarEstudante, user } = props;
	const [form] = Form.useForm();
	const { setUserContextAndLocalStorage } = useAuth();
	const { t } = useTranslation();
	const { Item } = Form;
	const [cidades, setCidades] = useState<any[]>([]);
	const [competencias, setCompetencias] = useState<CompetenciaType[]>([]);
	const [estudanteNovo, setEstudanteNovo] = useState<any>(user);
	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";
	const { user: userLocal } = useAuth();

	useEffect(() => {
		if (estudanteNovo) {
			form.setFieldsValue({
				...estudanteNovo,
				dataNascimento: moment(estudanteNovo.dataNascimento, dateFormatDto),
				competencias: estudanteNovo.competencias?.map((c: CompetenciaType) => c.codCompetencia),
			});
		}
	}, [estudanteNovo]);

	const fetchCompetencias = async () => {
		const { data, status } = await getCompetencias();
		if (status === 200) {
			setCompetencias(data);
		}
	};

	useEffect(() => {
		fetchCompetencias();
	}, []);

	const trataCompetencias = (competencias: CompetenciaType[] | undefined) => {
		const novasCompetencias = competencias?.map(comp => {
			return { codCompetencia: comp };
		});
		return novasCompetencias;
	};

	const onChangeEstudante = (estud: any) => {
		setEstudanteNovo({
			...estud,
			competencias: trataCompetencias(estud.competencias),
		});
	};

	console.log(estudanteNovo);

	const optionsNvlEscolaridade = getEnumConstant(nvlEscolaridadeEnum);

	const getCEPInformacoes = async (cep: string | undefined) => {
		getCEP(cep)
			.then(response => {
				if (response?.status === 200 && !response?.data?.erro) {
					const { logradouro, bairro, localidade, uf, complemento } = response.data;
					const endereco = {
						logradouro,
						bairro,
						cidade: localidade,
						estado: uf,
						complemento,
					};
					setEstudanteNovo({
						...estudanteNovo,
						endereco,
					});
				} else {
					message.error(t("cep_not_found"));
				}
			})
			.catch(error => {
				message.error(t("invalid_cep"));
			});
	};

	const geraCidades = (estado: string) => {
		getCidades(estado).then(response => {
			if (response?.status === 200) {
				setCidades(response.data);
				setEstudanteNovo({
					...estudanteNovo,
					endereco: {
						...estudanteNovo.endereco,
						estado: estado,
						cidade: undefined,
					},
				});
			}
		});
	};

	const mostrarMensagemErro = (errorInfo: any) => {
		message.error(t("error_form"));
	};

	const salvarEstudante = async (estudanteSalvar: any) => {
		const body = {
			...user,
			...estudanteSalvar,
			competencias: trataCompetencias(estudanteSalvar.competencias),
			dataNascimento: estudanteSalvar.dataNascimento.format(dateFormatDto),
		};

		const { status } = await putEstudante(user?.codEstudante, body);

		const userLocalStorage = {
			...userLocal,
			...body,
		};

		if (status === 200) {
			message.success(t("student_updated"));
			console.log(userLocalStorage);
			setUserContextAndLocalStorage(userLocalStorage);
			posSalvarEstudante?.();
		}

	};

	return (
		<>
			<Divider>{t("personal_information")}</Divider>
			<Form
				form={form}
				name="vaga"
				labelCol={{ span: 6 }}
				onFinish={salvarEstudante}
				onFinishFailed={mostrarMensagemErro}
				onValuesChange={(changedValues, allValues) => {
					onChangeEstudante(allValues);
				}}
				autoComplete="off"
			>
				<Item
					name="nome"
					label={t("name")}
					rules={[{ required: true, message: t("title_required") }]}
				>
					<Input placeholder={t("name")} />
				</Item>

				<Item
					name="dataNascimento"
					label={t("birth_date")}
					rules={[{ required: true, message: t("required") }]}
				>
					<DatePicker
						format={dateFormat}
						style={{ width: "150px" }}
						placeholder={t("birth_date")}
						allowClear={false}
					/>
				</Item>

				<Item
					name="nvlEscolaridade"
					label={t("student_level")}
					rules={[{ required: true, message: t("required") }]}
				>
					<Select allowClear={true} placeholder={t("select_type")} style={{ width: 200 }}>
						{optionsNvlEscolaridade.map(option => (
							<Select.Option key={option.value} value={option.value}>
								{option.label}
							</Select.Option>
						))}
					</Select>
				</Item>

				<Item name="competencias" label={"Soft-Skills"} rules={[{ type: "array" }]}>
					<Select showArrow={true} mode="multiple" allowClear={true} placeholder={"Soft-Skills"}>
						{competencias?.map(competencia => (
							<Select.Option key={competencia.codCompetencia} value={competencia.codCompetencia}>
								{competencia.descricaoCompetencia}
							</Select.Option>
						))}
					</Select>
				</Item>

				<Divider>{t("address")}</Divider>

				<Group
					compact
					style={{
						display: "flex",
						gap: "10px",
						alignItems: "baseline",
						flexWrap: "wrap",
						width: "100%",
					}}
				>
					<Item name={["endereco", "codEndereco"]} hidden={true}>
						<Input />
					</Item>
					<Item name={["endereco", "cep"]} label={t("cep")} labelCol={{ span: 19 }}>
						<Search
							style={{ width: "140px" }}
							minLength={8}
							maxLength={9}
							placeholder={t("cep")}
							onSearch={e => getCEPInformacoes(e)}
						/>
					</Item>
					<Item
						name={["endereco", "estado"]}
						style={{ width: "40%", margin: "0 15px" }}
						label={t("state")}
					>
						<SelectEstados onChange={e => geraCidades(e)} />
					</Item>
					<Item
						name={["endereco", "cidade"]}
						label={t("city")}
						labelCol={{ span: 19 }}
						style={{ width: "150px", margin: "0 15px" }}
						rules={[{ required: true, message: t("city_required") }]}
					>
						<Select placeholder={t("city")}>
							{cidades.map(cidade => (
								<Select.Option key={cidade.id} value={cidade.nome}>
									{cidade.nome}
								</Select.Option>
							))}
						</Select>
					</Item>
					<Item
						name={["endereco", "bairro"]}
						label={t("district")}
						labelCol={{ span: 19 }}
						rules={[{ required: true, message: t("city_required") }]}
					>
						<Input placeholder={t("district")} />
					</Item>
					<Item
						name={["endereco", "logradouro"]}
						style={{ width: "50%", margin: "0 15px" }}
						labelCol={{ span: 19 }}
						label={t("street")}
						rules={[{ required: true, message: t("city_required") }]}
					>
						<Input placeholder={t("street")} />
					</Item>
					<Item name={["endereco", "numero"]} label={t("number")} labelCol={{ span: 19 }}>
						<InputNumber placeholder={t("number")} />
					</Item>
					<Item
						name={["endereco", "pontoReferencia"]}
						label={t("reference_point")}
						labelCol={{ span: 16 }}
					>
						<Input placeholder={t("reference_point")} />
					</Item>
					<Item
						name={["endereco", "complemento"]}
						label={t("complement")}
						labelCol={{ span: 14, offset: 2 }}
						wrapperCol={{ offset: 2 }}
					>
						<Input style={{ width: "150px" }} placeholder={t("complement")} />
					</Item>
				</Group>

				<Item wrapperCol={{ offset: 10, span: 16 }}>
					<Button type="primary" htmlType="submit">
						{t("save")}
					</Button>
				</Item>
			</Form>
		</>
	);
};

export default EdicaoEstudante;
