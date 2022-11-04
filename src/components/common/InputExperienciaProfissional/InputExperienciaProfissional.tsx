import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import styles from './styles.module.scss';
import React from 'react';

interface InputExperienciaProps {
    labels?: string[];
    labelGeral?: string;
}

const InputExperienciaProfissional = ({labels, labelGeral}: InputExperienciaProps) => {

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
            <Form.List name="users">
                {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                            {...restField}
                            name={[name, 'first']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                        >
                            <Input placeholder="Nome da empresa" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'last']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
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

export default InputExperienciaProfissional;