import { nivelEscolaridadeObject, statusHistoricoEscolarObject } from '@/constants/objects';
import { CadastroEstudanteType } from '@/types/userTypes';
import { CheckOutlined, CloseCircleOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input as InputAntd, Row, Space, DatePicker, DatePickerProps, Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import Input from '../Input/Input';
import styles from './styles.module.scss';

interface InputExperienciaProps {
    labels?: string[];
    labelGeral?: string;
    estudante?: CadastroEstudanteType; 
}

// Todo - Colocar os formatos de data em constantes para nao reescrever codigo
// Todo - Arrumar os rules de cada item

const InputHistoricoEscolar = (props: InputExperienciaProps) => {

    const { labels, labelGeral } = props;
    const { estudante } = props;
    const status: SelectProps['options'] = [];
    const escolaridade: SelectProps['options'] = [];

    Object.keys(statusHistoricoEscolarObject).forEach((key) => {
        status.push({
            label: statusHistoricoEscolarObject[key].label,
            value: statusHistoricoEscolarObject[key].value
        })
    })

    Object.keys(nivelEscolaridadeObject).forEach((key) => {
        escolaridade.push({
            label: nivelEscolaridadeObject[key].label,
            value: nivelEscolaridadeObject[key].value
        })
    })

    const RULES = [
        { 
            required: true, 
            message: 'Campo obrigatorio' 
        }
    ]

    const { t } = useTranslation();

    const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

    const datePasserInicio: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	}

    const datePasserFim: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	}

    const handleData = (value: string) => {
        console.log(value);
    }

    return (
        <>
            <hr
                style={{
                    width: "100%",
                    margin: "1rem 0",
                    border: "0.1px solid var(--primary-color)",
                }}
            />
            <h3 className={styles.label}>{labelGeral}</h3>
            <Form.List name="historicoEscolar">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div className={styles.containerDiv}>
                            <Space key={key} className={styles.spaceRow} align="baseline">
                                <Row style={{width: "100%"}}>
                                    <Form.Item {...restField} name={[name, "descricao"]} rules={[...RULES]}>
                                        <label className={styles.label}>{"Nivel de escolaridade"}</label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Competencias"
                                            defaultValue={[]}
                                            onChange={() => {}}
                                            options={escolaridade}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row style={{display: "flex", flexDirection: "row", width: "100%"}}>
                                    <Form.Item {...restField} name={[name, 'curso']} rules={[...RULES]}>
                                        <Input placeholder="Nome do curso" />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'instEnsino']} rules={[...RULES]}>
                                        <Input placeholder="Nome da instituiçao" />
                                    </Form.Item>
                                </Row>
                                <Row style={{width: "100%"}}>
                                    <Form.Item {...restField} name={[name, "descricao"]} rules={[...RULES]}>
                                        <label className={styles.label}>{"Status"}</label>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Competencias"
                                            defaultValue={[]}
                                            onChange={() => {}}
                                            options={status}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item {...restField} name={[name, "dataInicio"]} rules={[...RULES]}>
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataInicio"
                                            placeholder={"Inicio"}
                                            onChange={datePasserInicio}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, "dataFim"]} rules={[...RULES]} >
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataFim"
                                            placeholder={"Fim"}
                                            onChange={datePasserFim}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                </Row>
                            </Space>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <Button type="ghost" onClick={() => remove(name)} block icon={<CloseCircleOutlined />} className={styles.btnSave}/>
                            </div>
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Adicionar experiencia
                        </Button>
                    </Form.Item>
                </>
                )}
        </Form.List>
      </>
    );
}

export default InputHistoricoEscolar;