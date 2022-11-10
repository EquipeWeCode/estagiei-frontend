import { Select } from "antd";
import { useEffect } from "react";
import styles from './styles.module.scss';

interface InputSelectProps {
    label: string;
    choices: string[];
    value?: string;
    change: (value: string) => void;
}

const InputSelect = (props: InputSelectProps) => {
    const { label, choices, value } = props;

    return (
        <>
            <label className={styles.label}>{label}</label>
            <Select value={value} onChange={(value) => {props.change(value)}}>
                {choices.map((choice) => {
                    return <Select.Option key={choice} value={choice}>{choice}</Select.Option>
                } )}
            </Select>
        </>
    );
}

export default InputSelect;