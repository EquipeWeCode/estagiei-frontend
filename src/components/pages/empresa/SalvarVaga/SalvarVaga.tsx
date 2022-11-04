import { Button } from "antd";
import ButtonDrawer from "@/components/common/ButtonDrawer";
import Input from "@/components/common/Input";
import { Group, Search, TextArea } from "@/components/common/Input/Input";
import SelectEstados from "@/components/common/select-estados";
import { modalidadeEnum, REMOTO } from "@/constants/enums";
import { getCompetencias } from "@/services/competencias";
import { getCEP, getCidades } from "@/services/endereco";
import { getVaga, postVaga, putVaga } from "@/services/vaga";
import { CompetenciaType } from "@/types/competenciaType";
import { VagaType } from "@/types/vagasTypes";
import { removeEmpty } from "@/utils/masks";
import { getEnumConstant } from "@/utils/selects";
import { EditFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, InputNumber, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type SalvarVagaProps = {
	vaga?: VagaType;
	posOperacao?: () => void;
};

const SalvarVaga = ({ vaga, posOperacao }: SalvarVagaProps) => {
	const isEdicao = vaga?.codVaga !== undefined;
	const codVaga = vaga?.codVaga;
	const { t } = useTranslation();
	const [vagaNova, setVagaNova] = useState<any>({});
	const [competencias, setCompetencias] = useState<CompetenciaType[]>([]);
	const [cidades, setCidades] = useState<any[]>([]);

	const fetchVaga = async () => {
		if (codVaga) {
			const { data, status } = await getVaga(codVaga);
			if (status === 200) {
				setVagaNova(data);
			}
		}
	};

	const fetchCompetencias = async () => {
		const { data, status } = await getCompetencias();
		if (status === 200) {
			setCompetencias(data);
		}
	};

	const getCEPInformacoes = async (cep: string | undefined) => {
		getCEP(cep)
			.then(response => {
				console.log(response);
				if (response?.status === 200 && !response?.data?.erro) {
					const { logradouro, bairro, localidade, uf, complemento } = response.data;
					const endereco = {
						logradouro,
						bairro,
						cidade: localidade,
						estado: uf,
						complemento,
					};
					setVagaNova({
						...vagaNova,
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

	const { Item } = Form;
	const [form] = Form.useForm();

	const trataCompetencias = (competencias: CompetenciaType[] | undefined) => {
		const novasCompetencias = competencias?.map(comp => {
			return { codCompetencia: comp };
		});
		return novasCompetencias;
	};

	const salvaVaga = async (vaga: VagaType) => {
		const { competencias } = vaga;

		const vagaSemNulos = removeEmpty(vaga);
		const novasCompetencias = trataCompetencias(competencias);

		const vagaNovaBody = {
			...vagaSemNulos,
			competencias: novasCompetencias,
		};

		console.log(vagaNovaBody);

		if (isEdicao) {
			const { status } = await putVaga(codVaga, vagaNovaBody);
			if (status === 200) {
				message.success(t("vaga_updated"));
				posOperacao && posOperacao();
			}
		} else {
			const { status } = await postVaga(vagaNovaBody);
			if (status === 201) {
				message.success(t("vaga_created"));
				posOperacao && posOperacao();
			}
		}
	};

	const mostrarMensagemErro = (errorInfo: any) => {
		message.error(t("error_form"));
	};

	useEffect(() => {
		if (vagaNova) {
			form.setFieldsValue({
				...vagaNova,
				competencias: vagaNova.competencias?.map((c: CompetenciaType) => c.codCompetencia),
			});
		}
	}, [vagaNova]);

	const onChangeVaga = (vaga: any) => {
		if (vaga?.modalidade === REMOTO) {
			vaga.endereco = undefined;
		}

		setVagaNova({
			...vaga,
			competencias: trataCompetencias(vaga.competencias),
		});
	};

	const isRemoto = vagaNova?.modalidade === REMOTO;

	const optionsModalidade = getEnumConstant(modalidadeEnum);

	const geraCidades = (estado: string) => {
		getCidades(estado).then(response => {
			if (response?.status === 200) {
				setCidades(response.data);
				setVagaNova({
					...vagaNova,
					endereco: {
						...vagaNova.endereco,
						estado: estado,
						cidade: undefined,
					},
				});
			}
		});
	};

	return (
		<Tooltip
			title={isEdicao ? t("edit_job") : t("new_job")}
			overlayStyle={{ zIndex: "1" }}
			placement={isEdicao ? "top" : "bottom"}
		>
			<span>
				<ButtonDrawer
					onOpen={() => {
						fetchVaga();
						fetchCompetencias();
					}}
					icon={isEdicao ? <EditFilled /> : <PlusOutlined />}
					titleDrawer={isEdicao ? `${t("edit_job")} - ${vaga?.titulo}` : t("new_job")}
				>
					<Form
						form={form}
						name="vaga"
						labelCol={{ span: 6 }}
						onFinish={salvaVaga}
						onFinishFailed={mostrarMensagemErro}
						onValuesChange={(changedValues, allValues) => {
							onChangeVaga(allValues);
						}}
						autoComplete="off"
					>
						<Item
							name="titulo"
							label={t("title")}
							rules={[{ required: true, message: t("title_required") }]}
						>
							<Input placeholder={t("title")} />
						</Item>

						<Item
							name="salario"
							label={t("salary")}
							rules={[{ required: true, message: t("salary_required") }]}
						>
							<InputNumber addonBefore={"R$"} style={{ width: "150px" }} placeholder={t("salary")} precision={2} />
						</Item>

						<Item
							name="cargaHoraria"
							label={t("working_hours")}
							rules={[{ required: true, message: t("working_hours_required") }]}
						>
							<InputNumber addonAfter={t("hrs_day")} style={{ width: "150px" }} min={1} max={6} />
						</Item>

						<Item
							name="modalidade"
							label={t("type")}
							rules={[{ required: true, message: t("type_required") }]}
						>
							<Select allowClear={true} placeholder={t("select_type")} style={{ width: 200 }}>
								{optionsModalidade.map(option => (
									<Select.Option key={option.value} value={option.value}>
										{option.label}
									</Select.Option>
								))}
							</Select>
						</Item>

						<Item name="curso" label={t("course")}>
							<Input placeholder={t("course")} />
						</Item>

						<Item name="competencias" label={"Soft-Skills"} rules={[{ type: "array" }]}>
							<Select
								showArrow={true}
								mode="multiple"
								allowClear={true}
								placeholder={"Soft-Skills"}
							>
								{competencias.map(competencia => (
									<Select.Option
										key={competencia.codCompetencia}
										value={competencia.codCompetencia}
									>
										{competencia.descricaoCompetencia}
									</Select.Option>
								))}
							</Select>
						</Item>

						<Group compact>
							<Item name={["endereco", "codEndereco"]} hidden={true}>
								<Input />
							</Item>
							<Item name={["endereco", "cep"]} label={t("cep")} labelCol={{ span: 19 }}>
								<Search
									style={{ width: "140px" }}
									minLength={8}
									maxLength={9}
									placeholder={t("cep")}
									disabled={isRemoto}
									onSearch={e => getCEPInformacoes(e)}
								/>
							</Item>
							<Item
								name={["endereco", "estado"]}
								style={{ width: "40%", margin: "0 15px" }}
								label={t("state")}
								rules={[{ required: !isRemoto, message: t("state_required") }]}
							>
								<SelectEstados onChange={e => geraCidades(e)} disabled={isRemoto} />
							</Item>
							<Item
								name={["endereco", "cidade"]}
								label={t("city")}
								labelCol={{ span: 19 }}
								style={{ width: "150px" }}
								rules={[{ required: !isRemoto, message: t("city_required") }]}
							>
								<Select placeholder={t("city")} disabled={isRemoto}>
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
								rules={[{ required: !isRemoto, message: t("district_required") }]}
							>
								<Input placeholder={t("district")} disabled={isRemoto} />
							</Item>
							<Item
								name={["endereco", "logradouro"]}
								style={{ width: "50%", margin: "0 15px" }}
								labelCol={{ span: 19 }}
								label={t("street")}
								rules={[{ required: !isRemoto, message: t("street_required") }]}
							>
								<Input placeholder={t("street")} disabled={isRemoto} />
							</Item>
							<Item name={["endereco", "numero"]} label={t("number")} labelCol={{ span: 19 }}>
								<InputNumber placeholder={t("number")} disabled={isRemoto} />
							</Item>
							<Item
								name={["endereco", "pontoReferencia"]}
								label={t("reference_point")}
								labelCol={{ span: 24 }}
							>
								<Input placeholder={t("reference_point")} disabled={isRemoto} />
							</Item>
							<Item
								name={["endereco", "complemento"]}
								label={t("complement")}
								labelCol={{ span: 24, offset: 2 }}
								wrapperCol={{ offset: 2 }}
							>
								<Input
									style={{ width: "150px" }}
									placeholder={t("complement")}
									disabled={isRemoto}
								/>
							</Item>
						</Group>

						<Item name="descricao" label={t("description")}>
							<TextArea name="descricao" value={vagaNova?.descricao} />
						</Item>

						<Item wrapperCol={{ offset: 10, span: 16 }}>
							<Button type="primary" htmlType="submit">
								{t("save")}
							</Button>
						</Item>
					</Form>
				</ButtonDrawer>
			</span>
		</Tooltip>
	);
};

export default SalvarVaga;
