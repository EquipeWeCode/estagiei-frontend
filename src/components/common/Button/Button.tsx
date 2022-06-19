import { Button as ButtonAntd, ButtonProps } from "antd";

const Button = (props: ButtonProps) => {
	return (
		<ButtonAntd
			{...props}
			style={{
				...props.style,
				borderRadius: "0.5rem",
			}}
		/>
	);
};

export default Button;
