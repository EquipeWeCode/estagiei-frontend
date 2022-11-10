import { Input as AntdInput, InputProps, InputNumber, InputNumberProps } from "antd";
import styles from "./styles.module.scss";

export interface InputCustomProps extends InputProps {
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

export default Input;
