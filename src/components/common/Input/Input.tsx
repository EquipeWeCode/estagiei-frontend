import { Input as AntdInput, InputProps } from "antd";

const Input = (props: InputProps) => {
	return <AntdInput style={{ borderRadius: "0.5rem" }} allowClear={true} {...props} />;
};

export default Input;
