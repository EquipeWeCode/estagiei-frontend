import Button from "@/components/common/Button";
import ButtonDrawer from "@/components/common/ButtonDrawer";
import Input from "@/components/common/Input";
import { TextArea } from "@/components/common/Input/Input";
import { getVaga } from "@/services/vaga";
import { VagaType } from "@/types/vagasTypes";
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Tooltip } from "antd";
import { useState, useEffect } from "react";
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

	const fetchVaga = async () => {
		if (codVaga) {
			const { data, status } = await getVaga(codVaga);
			if (status === 200) {
				setVagaNova(data);
			}
		}
	};

	const { Item } = Form;
	const [form] = Form.useForm();

	const changeVaga = (vaga: VagaType) => {
		console.log(vaga);
		// setVagaNova({ ...vagaNova, [e.target?.name]: e.target?.value });
	};

	useEffect(() => {
		if (vagaNova) {
			form.setFieldsValue(vagaNova);
		}
	}, [vagaNova]);

	console.log(form);

	return (
		<Tooltip
			title={isEdicao ? t("edit_job") : t("new_job")}
			overlayStyle={{ zIndex: "1" }}
			placement={isEdicao ? "top" : "bottom"}
		>
			<span>
				<ButtonDrawer
					onOpen={fetchVaga}
					icon={isEdicao ? <EditFilled /> : <PlusOutlined />}
					titleDrawer={isEdicao ? `${t("edit_job")} - ${vaga?.titulo}` : t("new_job")}
				>
					<Form
						form={form}
						name="vaga"
						labelCol={{ span: 4 }}
						onValuesChange={changeVaga}
						// wrapperCol={{ span: 16 }}
						initialValues={{
							titulo: vagaNova?.titulo,
						}}
						onFinish={changeVaga}
						onFinishFailed={() => console.log("falhou")}
						autoComplete="off"
					>
						<Item
							name="titulo"
							label={t("title")}
							rules={[{ required: true, message: t("title_required") }]}
						>
							<Input />
						</Item>

						<Item name="descricao" label={t("description")} rules={[{ type: "string" }]}>
							<TextArea name="descricao" value={vagaNova?.descricao} />
						</Item>

						<Item valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
							<Checkbox>Remember me</Checkbox>
						</Item>

						<Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Item>
					</Form>
				</ButtonDrawer>
			</span>
		</Tooltip>
	);
};

export default SalvarVaga;
