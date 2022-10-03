import { Input as AntdInput, InputProps } from "antd";

const Input = (props: InputProps) => {
	return <AntdInput style={{ borderRadius: "5px" }} allowClear={true} {...props} />;
};

export default Input;
