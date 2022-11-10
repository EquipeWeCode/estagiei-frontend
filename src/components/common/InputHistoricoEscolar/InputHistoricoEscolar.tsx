import { nivelEscolaridadeObject, statusHistoricoEscolarObject } from '@/constants/objects';
import { CadastroEstudanteType } from '@/types/userTypes';
import { CheckOutlined, CloseCircleOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input as InputAntd, Row, Space, DatePicker, DatePickerProps, Select, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import Input from '../Input/Input';
import styles from './styles.module.scss';
import { useState } from 'react';
import { historicoEscolarType } from '@/types/historicoEscolarType';
import { useForm } from 'antd/lib/form/Form';

interface InputExperienciaProps {
    labels?: string[];
    labelGeral?: string;
    estudante?: CadastroEstudanteType;
    state?: (value: {}) => void;
    form: any;
}

// Todo - Colocar os formatos de data em constantes para nao reescrever codigo
// Todo - Arrumar os rules de cada item

const InputHistoricoEscolar = (props: InputExperienciaProps) => {

    const { labels, labelGeral, estudante, state, form } = props;
    
    // const [dataInicio, setDataInicio] = useState<string>();
    // const [dataFim, setDataFim] = useState<string>();

    const { Option } = Select;

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
                        <div className={styles.containerDiv} key={key}>
                            <Form.Item>
                                <Row style={{width: "100%"}}>
                                    <label className={styles.label}>{"Escolaridade"}</label>
                                    <Form.Item {...restField} name={[name, "nvlEscolaridade"]} rules={[...RULES]}>
                                        <Select
                                            key={key}
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Escolaridade"
                                        >
                                            {Object.keys(nivelEscolaridadeObject).map((key) => {
                                                return (
                                                    <Option key={key} value={nivelEscolaridadeObject[key].value}>{nivelEscolaridadeObject[key].label}</Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Row>
                                <Row style={{display: "flex", flexDirection: "column"}}>
                                    <Form.Item style={{flex: "1"}} {...restField} name={[name, 'curso']} rules={[...RULES]}>
                                        <Input placeholder={t("institutionName")} />
                                    </Form.Item>
                                    <Form.Item style={{flex: "1"}} {...restField} name={[name, 'instEnsino']} rules={[...RULES]}>
                                        <Input placeholder={t("courseName")} />
                                    </Form.Item>
                                </Row>
                                <Row style={{width: "100%"}}>
                                    <label className={styles.label}>{"Status"}</label>
                                    <Form.Item {...restField} name={[name, "status"]} rules={[...RULES]}>
                                        <Select
                                            key={key}
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder={"Status"}
                                        >
                                            {Object.keys(statusHistoricoEscolarObject).map((key) => {
                                                return (
                                                    <Option key={key} value={statusHistoricoEscolarObject[key].value}>{statusHistoricoEscolarObject[key].label}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Row>
                                <Row style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <Form.Item style={{flex: "1"}} {...restField} name={[name, "dataInicio"]} rules={[...RULES]}>
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataInicio"
                                            placeholder={t("dateStart")}
                                            onChange={datePasserInicio}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item style={{flex: "1"}} {...restField} name={[name, "dataFim"]} >
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataFim"
                                            placeholder={t("dateEnd")}
                                            onChange={datePasserFim}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                </Row>
                                <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}}>
                                    <Button type="primary" danger onClick={() => remove(name)} block icon={<CloseCircleOutlined />} className={styles.btnSave}/>
                                </div>
                            </Form.Item>
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                            {t("addHistoric")}
                        </Button>
                    </Form.Item>
                </>
                )}
        </Form.List>
      </>
    );
}

export default InputHistoricoEscolar;