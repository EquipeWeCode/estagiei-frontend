import { tipoContatoObject } from "@/constants/objects";
import { CadastroEstudanteType } from "@/types/userTypes";
import { Form, InputProps, Row, Select, SelectProps } from "antd";
import Input from "../Input/Input";
import styles from './styles.module.scss';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

interface InputContatoProps extends InputProps {
    label?: string;
    estudante?: CadastroEstudanteType;
    state?: (value: {}) => void;
}

const InputContato = (props: InputContatoProps) => {
    const { estudante, state } = props;
    const tipo: SelectProps['options'] = [];
    const { t } = useTranslation();

    const [valorContato, setValorContato] = useState<string>("");
    const [tipoContato, setTipoContato] = useState<string>("");

    const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

    Object.keys(tipoContatoObject).forEach((key) => {
        tipo.push({
            label: tipoContatoObject[key].label,
            value: tipoContatoObject[key].value
        })
    })

    const handleSelect = (value: string) => {       
        if(!state) 
           return 

        setTipoContato(value);
        state({...estudante, contatos: [{
            valorContato: valorContato,
            tipoContato: value,
            descContato: ""
        }]});
    }

    const handleInput = (value: string) => {      
        if(!state) 
           return 

        setValorContato(value);
        state({...estudante, contatos: [{
            valorContato: value,
            tipoContato: tipoContato,
            descContato: ""
        }]});
    }

    return (
        <>
            <h3 className={styles.label} style={{}}>{"Contato"}</h3>
            <Row className={styles.containerInput}>
                <Form.Item style={{flex: "1"}}>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Competencias"
                        onChange={handleSelect}
                        options={tipo}
                    />
                </Form.Item>
                <Form.Item style={{flex:"3"}} rules={[...RULES, { required: true, pattern: new RegExp(/\d+/g), message: "Apenas numeros permitidos!" } ]}>
                    <Input {...props} placeholder="Telefone" onChange={(e) => {handleInput(e.target.value)}}/>
                </Form.Item>
            </Row>
        </>
    );
}

export default InputContato