import { Select } from "antd";

type value = {
    type?: string;
    label?: string;
}

interface InputSelectProps {
    values: value[];
}

const InputSelect = (props: InputSelectProps) => {
    const { Option } = Select;

    return (
        <Select defaultValue="Option1">
            <Option value="Option1">Option1</Option>
            <Option value="Option2">Option2</Option>
        </Select>
    );
}

export default InputSelect;