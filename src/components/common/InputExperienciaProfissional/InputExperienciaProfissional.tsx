import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';

const InputExperienciaProfissional = () => {


    return (
        <Form.List name="experienciaProfissional">
            {(fields, { add, remove }) => (
            <>
                {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'first']} rules={[{ required: true, message: 'Missing first name' }]}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'last']} rules={[{ required: true, message: 'Missing last name' }]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
                ))}
            </>
            )}
        </Form.List>
    );
}

export default InputExperienciaProfissional;