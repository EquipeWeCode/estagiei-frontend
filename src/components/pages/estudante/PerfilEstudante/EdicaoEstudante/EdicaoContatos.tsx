import Input from "@/components/common/Input";
import { tipoContatoEnum } from "@/constants/enums";
import { getEnumConstant } from "@/utils/selects";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Select } from "antd";
import { useTranslation } from "react-i18next";

const EdicaoContatos = () => {
	const { Item } = Form;
	const { t } = useTranslation();
	const optionsTipoContato = getEnumConstant(tipoContatoEnum);

	const RULES = [{ required: true, message: t("required") }];

	return (
		<Form.List name="contatos">
			{(fields, { add, remove }) => {
				return (
					<div>
						{fields?.map((field, index) => (
							<div key={field.key}>
								<Item name={[index, "codContato"]} hidden={true}>
									<Input />
								</Item>
								<Item name={[index, "tipoContato"]} label={t("type")} rules={RULES}>
									<Select placeholder={t("type")}>
										{optionsTipoContato.map(option => (
											<Select.Option key={option.value} value={option.value}>
												{option.label}
											</Select.Option>
										))}
									</Select>
								</Item>
								<Item label={t("value")} name={[index, "valorContato"]} rules={RULES}>
									<Input placeholder={t("value")} />
								</Item>
								<Item label={t("description")} name={[index, "descContato"]}>
									<Input placeholder={t("description")} />
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

export default EdicaoContatos;
