import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
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

const InputHistoricoEscolar = (props: InputExperienciaProps) => {

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

    const datePasser: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	}

    const handleData = () => {
        console.log("teste");
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
            <label className={styles.label}>{labelGeral}</label>
            <Form.List name="experienciaProfissional">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div className={styles.containerDiv}>
                            <Space key={key} className={styles.spaceRow} align="baseline">
                                <Row>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'nomeEmpresa']}
                                        rules={[...RULES]}
                                    >
                                        <Input placeholder="Nome da empresa" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'cargo']}
                                        rules={[...RULES]}
                                    >
                                        <Input placeholder="Cargo" />
                                    </Form.Item>
                                </Row>
                                <Row style={{width: "100%"}}>
                                    <Form.Item {...restField} name={[name, "descricao"]} rules={[...RULES]} >
                                        <InputAntd.TextArea style={{}}  />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item {...restField} name={[name, "dataInicio"]} rules={[...RULES]} >
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataInicio"
                                            placeholder={t("birth_date")}
                                            onChange={datePasser}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, "dataFim"]} rules={[...RULES]} >
                                        <DatePicker
                                            style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
                                            name="dataFim"
                                            placeholder={t("birth_date")}
                                            onChange={datePasser}
                                            format={dateFormat}
                                        />
                                    </Form.Item>
                                </Row>
                            </Space>
                            <Button type="ghost" onClick={() => remove(name)} block icon={<MinusOutlined />} className={styles.btnSave}/>
                            <Button type="primary" onClick={() => handleData()} block icon={<CheckOutlined />} className={styles.btnSave}/>
                        </div>
                    ))}
                    <Form.Item>
                        <Button htmlType="submit" type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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