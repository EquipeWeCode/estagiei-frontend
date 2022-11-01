import { Select } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export type SelectEstadosProps = {
	value?: string;
	onChange?: (value: string) => void;
	name?: string;
	label?: string;
};

const SelectEstados = ({ onChange, value, label }: SelectEstadosProps) => {

  const { t } = useTranslation();

	return (
		<>
			<label className={styles.label}>{label}</label>
			<Select allowClear={true} onChange={onChange} value={value} style={{minWidth: "150px"}}>
				<Select.Option value="AC">Acre</Select.Option>
				<Select.Option value="AL">Alagoas</Select.Option>
				<Select.Option value="AP">Amapá</Select.Option>
				<Select.Option value="AM">Amazonas</Select.Option>
				<Select.Option value="BA">Bahia</Select.Option>
				<Select.Option value="CE">Ceará</Select.Option>
				<Select.Option value="DF">Distrito Federal</Select.Option>
				<Select.Option value="ES">Espírito Santo</Select.Option>
				<Select.Option value="GO">Goiás</Select.Option>
				<Select.Option value="MA">Maranhão</Select.Option>
				<Select.Option value="MT">Mato Grosso</Select.Option>
				<Select.Option value="MS">Mato Grosso do Sul</Select.Option>
				<Select.Option value="MG">Minas Gerais</Select.Option>
				<Select.Option value="PA">Pará</Select.Option>
				<Select.Option value="PB">Paraíba</Select.Option>
				<Select.Option value="PR">Paraná</Select.Option>
				<Select.Option value="PE">Pernambuco</Select.Option>
				<Select.Option value="PI">Piauí</Select.Option>
				<Select.Option value="RJ">Rio de Janeiro</Select.Option>
				<Select.Option value="RN">Rio Grande do Norte</Select.Option>
				<Select.Option value="RS">Rio Grande do Sul</Select.Option>
				<Select.Option value="RO">Rondônia</Select.Option>
				<Select.Option value="RR">Roraima</Select.Option>
				<Select.Option value="SC">Santa Catarina</Select.Option>
				<Select.Option value="SP">São Paulo</Select.Option>
				<Select.Option value="SE">Sergipe</Select.Option>
				<Select.Option value="TO">Tocantins</Select.Option>
			</Select>
		</>
	);
};

export default SelectEstados;
