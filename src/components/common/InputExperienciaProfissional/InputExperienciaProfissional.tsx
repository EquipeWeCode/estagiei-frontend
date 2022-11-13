import { CheckOutlined, MinusOutlined, PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input as InputAntd, Row, Space, DatePicker, DatePickerProps, } from 'antd';
import { useTranslation } from 'react-i18next';
import Input from '../Input/Input';
import styles from './styles.module.scss';

interface InputExperienciaProps {
    labels?: string[];
    labelGeral?: string;
    form?: typeof Form; 
}

// Todo - Colocar os formatos de data em constantes para nao reescrever codigo
// Todo - Arrumar os rules de cada item

const InputExperienciaProfissional = (props: InputExperienciaProps) => {

    const { labels, labelGeral } = props;

    const RULES = [
        { 
            required: true, 
            message: 'Campo obrigatorio' 
        }
    ]

    const { t } = useTranslation();

    const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

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
            <Form.List name="experienciaProfissional">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div className={styles.containerDiv} key={key}>
                                <Row style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'nomeEmpresa']}
                                        rules={[...RULES]}
                                        style={{flex: "1"}}
                                    >
                                        <Input placeholder={t("company_name")}/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'cargo']}
                                        rules={[...RULES]}
                                        style={{flex: "1"}}
                                    >
                                        <Input placeholder={t("role")}/>
                                    </Form.Item>
                                </Row>
                                <Row style={{display: "flex", flexDirection: "row"}}>
                                    <Form.Item {...restField} name={[name, "descricao"]} rules={[...RULES]} style={{flex: "1"}}>
                                        <InputAntd.TextArea placeholder={t("description")}/>
                                    </Form.Item>
                                </Row>
                                <Row style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                                    <Form.Item {...restField} name={[name, "dataInicio"]} rules={[...RULES]} style={{flex: "1"}}>
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataInicio"
                                            placeholder={t("dateStart")}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, "dataFim"]} style={{flex: "1"}}>
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataFim"
                                            placeholder={t("dateEnd")}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                </Row>
                            <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}}>
                                <Button type="primary" danger onClick={() => remove(name)} block icon={<CloseCircleOutlined />} className={styles.btnSave}/>
                            </div>
                        </div>
                    ))}
                    <Form.Item>
                        <Button type="primary" onClick={() => add()} block icon={<PlusOutlined />}>
                            {t("addExperience")}
                        </Button>
                    </Form.Item>
                </>
                )}
        </Form.List>
      </>
    );
}

export default InputExperienciaProfissional;