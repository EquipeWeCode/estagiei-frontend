import Input from "@/components/common/Input";
import { nvlEscolaridadeCursoEnum, statusHistEscolarEnum } from "@/constants/enums";
import { getEnumConstant } from "@/utils/selects";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Select } from "antd";
import { useTranslation } from "react-i18next";

const EdicaoHistoricoEscolar = () => {
	const { Item } = Form;
	const { t } = useTranslation();
	const dateFormat = "DD/MM/YYYY";
	const optionsNvlEscolaridade = getEnumConstant(nvlEscolaridadeCursoEnum);
	const optionsStatus = getEnumConstant(statusHistEscolarEnum);

	const RULES = [{ required: true, message: t("required") }];

	return (
		<Form.List name="historicoEscolar">
			{(fields, { add, remove }) => {
				return (
					<div>
						{fields?.map((field, index) => (
							<div key={field.key}>
								<Item name={[index, "codHistEscolar"]} hidden={true}>
									<Input />
								</Item>
								<Item name={[index, "curso"]} label={t("course")} rules={RULES}>
									<Input placeholder={t("course")} />
								</Item>
								<Item name={[index, "nvlEscolaridade"]} label={t("student_level")} rules={RULES}>
									<Select placeholder={t("student_level")}>
										{optionsNvlEscolaridade.map(option => (
											<Select.Option key={option.value} value={option.value}>
												{option.label}
											</Select.Option>
										))}
									</Select>
								</Item>
								<Item name={[index, "status"]} label={"Status"} rules={RULES}>
									<Select placeholder={"status"}>
										{optionsStatus.map(option => (
											<Select.Option key={option.value} value={option.value}>
												{option.label}
											</Select.Option>
										))}
									</Select>
								</Item>
								<Item name={[index, "instEnsino"]} label={t("institutionName")} rules={RULES}>
									<Input placeholder={t("institutionName")} />
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

export default EdicaoHistoricoEscolar;
