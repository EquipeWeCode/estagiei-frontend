import Input from "@/components/common/Input";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form } from "antd";
import { useTranslation } from "react-i18next";

const EdicaoExpProfissional = () => {
	const { Item } = Form;
	const { t } = useTranslation();
	const dateFormat = "DD/MM/YYYY";

	const RULES = [{ required: true, message: t("required") }];

	return (
		<Form.List name="experienciaProfissional">
			{(fields, { add, remove }) => {
				return (
					<div>
						{fields?.map((field, index) => (
							<div key={field.key}>
								<Item name={[index, "codExpProfissional"]} hidden={true}>
									<Input />
								</Item>
								<Item name={[index, "nomeEmpresa"]} label={t("company")} rules={RULES}>
									<Input placeholder={t("company")} />
								</Item>
								<Item name={[index, "cargo"]} label={t("role")} rules={RULES}>
									<Input placeholder={t("role")} />
								</Item>
								<Item name={[index, "descricao"]} label={t("description")}>
									<Input placeholder={t("description")} />
								</Item>
								<Item name={[index, "dataInicio"]} label={t("dateStart")} rules={RULES}>
									<DatePicker format={dateFormat} />
								</Item>
								<Item name={[index, "dataFim"]} label={t("dateEnd")}>
									<DatePicker format={dateFormat} />
								</Item>

								{fields.length > 0 ? (
									<Button danger onClick={() => remove(field.name)} icon={<DeleteOutlined />} />
								) : null}
							</div>
						))}
						<Item wrapperCol={{ offset: 7 }}>
							<Button
								icon={<PlusOutlined />}
								type="dashed"
								onClick={() => add()}
								style={{ width: "60%" }}
							/>
						</Item>
						<Divider />
					</div>
				);
			}}
		</Form.List>
	);
};

export default EdicaoExpProfissional;
