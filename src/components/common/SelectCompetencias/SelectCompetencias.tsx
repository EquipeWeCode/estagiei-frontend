import { CompetenciaType } from "@/types/competenciaType";
import { SelectProps, Select } from "antd";

interface SelectCompetenciasProps extends SelectProps {
    choices: CompetenciaType[];
    function: (value: string[]) => void
}

const SelectCompetencias = (props: SelectCompetenciasProps) => {
    const options: SelectProps['options'] = [];

    props.choices.forEach((choice) => {
        options.push({
            label: choice.descricaoCompetencia,
            value: choice.codCompetencia
        })
    })

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Competencias"
            defaultValue={[]}
            onChange={props.function}
            options={options}
        />
    );
}

export default SelectCompetencias;