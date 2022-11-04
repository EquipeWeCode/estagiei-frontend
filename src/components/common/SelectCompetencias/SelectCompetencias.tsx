import { CompetenciaType } from "@/types/competenciaType";
import { SelectProps, Select } from "antd";

interface SelectCompetenciasProps extends SelectProps {
    choices: CompetenciaType[];
}

const SelectCompetencias = (props: SelectCompetenciasProps) => {
    const options: SelectProps['options'] = [];

    props.choices.forEach((choice) => {
        options.push({
            label: choice.descricaoCompetencia,
            value: choice.descricaoCompetencia
        })
    })

    const handleChange = (value: string[]) => {
		console.log(`selected ${value}`);
	};

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Competencias"
            defaultValue={[]}
            onChange={handleChange}
            options={options}
        />
    );
}

export default SelectCompetencias;