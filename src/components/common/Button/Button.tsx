import { Button as ButtonAntd, ButtonProps } from "antd";
import styles from "./styles.module.css";

export interface ButtonCustomProps extends ButtonProps {
	secondary?: boolean;
	label?: string;
	onClick?: () => void;
}

const Button = (props: ButtonCustomProps) => {
	const { secondary } = props;

	const getStyle = () => {
		return (
			styles.antBtnCustom + " " + (secondary && " " + styles.btnSecondary) + " " + props.className
		);
	};

	return (
		<ButtonAntd
			{...props}
			className={getStyle()}
			style={{
				...props.style,
			}}
		>
			{props.children || props.label}
		</ButtonAntd>
	);
};

export default Button;
