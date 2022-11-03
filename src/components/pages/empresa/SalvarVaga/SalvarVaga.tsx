import Button from "@/components/common/Button";
import ButtonDrawer from "@/components/common/ButtonDrawer";
import Input from "@/components/common/Input";
import { TextArea } from "@/components/common/Input/Input";
import { modalidadeEnum } from "@/constants/enums";
import { getCompetencias } from "@/services/competencias";
import { getVaga } from "@/services/vaga";
import { CompetenciaType } from "@/types/competenciaType";
import { VagaType } from "@/types/vagasTypes";
import { getEnumConstant } from "@/utils/selects";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import { Form, InputNumber, Select, Tooltip } from "antd";
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

	const { Item } = Form;
	const [form] = Form.useForm();

	const salvaVaga = (vaga: VagaType) => {
		const { competencias } = vaga;

		const novasCompetencias = competencias?.map(comp => {
			return { codCompetencia: comp };
		});

		const vagaNovaBoy = {
			...vaga,
			competencias: novasCompetencias,
		};

		console.log(vagaNovaBoy);
	};

	const mostrarMensagemErro = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		if (vagaNova) {
			form.setFieldsValue({
				...vagaNova,
				competencias: vagaNova.competencias?.map((c: CompetenciaType) => c.codCompetencia),
			});
		}
	}, [vagaNova]);

	const optionsModalidade = getEnumConstant(modalidadeEnum);

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
						autoComplete="off"
					>
						<Item
							name="titulo"
							label={t("title")}
							rules={[{ required: true, message: t("title_required") }]}
						>
							<Input />
						</Item>

						<Item
							name="salario"
							label={t("salary") + " (R$)"}
							rules={[{ required: true, message: t("salary_required") }]}
						>
							<InputNumber style={{ width: "150px" }} />
						</Item>

						<Item
							name="cargaHoraria"
							label={t("working_hours")}
							rules={[{ required: true, message: t("working_hours_required") }]}
						>
							<InputNumber addonAfter={t("hrs_day")} style={{ width: "150px" }} min={1} max={6} />
						</Item>

						<Item name="modalidade" label={t("type")}>
							<Select allowClear={true} placeholder={t("select_type")} style={{ width: 200 }}>
								{optionsModalidade.map(option => (
									<Select.Option key={option.value} value={option.value}>
										{option.label}
									</Select.Option>
								))}
							</Select>
						</Item>

						<Item name="curso" label={t("course")}>
							<Input />
						</Item>

						<Item name="competencias" label={"Soft-Skills"} rules={[{ type: "array" }]}>
							<Select showArrow={true} mode="multiple" allowClear={true}>
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
						{/* 
						<Form.Item noStyle>
							<Select
								showArrow
								mode="multiple"
								value={novoUser.competencias?.map(competencia => competencia.codCompetencia)}
								placeholder={t("skills")}
								onChange={(value: (number | undefined)[] | undefined) => {
									setNovoUser({
										...novoUser,
										competencias: value && value.map(codCompetencia => ({ codCompetencia })),
									});
								}}
							>
								{competencias &&
									competencias.map(competencia => (
										<Select.Option
											key={competencia.codCompetencia}
											value={competencia.codCompetencia}
										>
											{competencia.descricaoCompetencia}
										</Select.Option>
									))}
							</Select>
						</Form.Item> */}

						<Item name="descricao" label={t("description")} rules={[{ type: "string" }]}>
							<TextArea name="descricao" value={vagaNova?.descricao} />
						</Item>

						<Item wrapperCol={{ offset: 8, span: 16 }}>
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
