import { CompetenciaType } from "@/types/competenciaType";
import { Select, SelectProps } from "antd";
import styles from "./styles.module.scss";

interface SelectCompetenciasProps extends SelectProps {
	choices: CompetenciaType[];
	label?: string;
	function: (value: string[]) => void;
}

const SelectCompetencias = (props: SelectCompetenciasProps) => {
	const options: SelectProps["options"] = [];

	props.choices.forEach(choice => {
		options.push({
			label: choice.descricaoCompetencia,
			value: choice.codCompetencia,
		});
	});

	return (
		<>
			<label className={styles.label}>{props.label}</label>
			<Select
				mode="multiple"
				allowClear
				style={{ width: "100%" }}
				placeholder="Soft-skills"
				defaultValue={[]}
				onChange={props.function}
				options={options}
			/>
		</>
	);
};

export default SelectCompetencias;
