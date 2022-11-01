import { Select } from "antd";
import styles from './styles.module.scss';

interface InputSelectProps {
    label: string;
    choices: string[];
    value?: string;
    change: (value: string) => void;
}

const InputSelect = (props: InputSelectProps) => {
    const { label } = props;
    const { choices } = props;
    const { value } = props;

    return (
        <>
            <label className={styles.label}>{label}</label>
            <Select defaultValue={value} onChange={(value) => {props.change(value)}}>
                {choices.map((choice) => {
                    return <Select.Option value={choice}>{choice}</Select.Option>
                } )}
            </Select>
        </>
    );
}

export default InputSelect;