import {
	Input as AntdInput,
	InputNumber as AntdInputNumber,
	InputNumberProps,
	InputProps,
} from "antd";
import styles from "./styles.module.scss";

export interface InputCustomProps extends InputProps {
	label?: string;
}

export interface InputNumberCustomProps extends InputNumberProps {
	label?: string;
}

export const InputPassword = (props: InputCustomProps) => {
	return (
		<>
			<label className={styles.label}>{props.label}</label>
			<AntdInput.Password {...props} style={{ borderRadius: "5px" }} allowClear={true} />
		</>
	);
};

export const { TextArea, Group, Search } = AntdInput;

const Input = (props: InputCustomProps) => {
	return (
		<>
			<label className={styles.label}>{props.label}</label>
			<AntdInput {...props} style={{ borderRadius: "5px" }} allowClear={true} />
		</>
	);
};

export const InputNumber = (props: InputNumberCustomProps) => {
	return (
		<>
			<label className={styles.label}>{props.label}</label>
			<AntdInputNumber {...props} style={{ borderRadius: "5px", width: "100%" }} />
		</>
	);
};

export default Input;
