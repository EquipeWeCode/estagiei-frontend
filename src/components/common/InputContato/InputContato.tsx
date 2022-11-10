import { tipoContatoObject } from "@/constants/objects";
import { Row, Select, SelectProps } from "antd";
import Input from "../Input/Input";
import styles from './styles.module.scss';

interface InputContatoProps {
    label?: string;
}

const InputContato = () => {
    const tipo: SelectProps['options'] = [];

    Object.keys(tipoContatoObject).forEach((key) => {
        tipo.push({
            label: tipoContatoObject[key].label,
            value: tipoContatoObject[key].value
        })
    })

    return (
        <>
            <Row>
                <div>
                    <label className={styles.label}>{"Contato"}</label>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Competencias"
                        defaultValue={[]}
                        onChange={() => {}}
                        options={tipo}
                    />
                </div>
                <div>
                    <Input placeholder="Telefone"/>
                </div>
            </Row>
        </>
    );
}

export default InputContato