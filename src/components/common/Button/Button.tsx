import { Button as ButtonAntd, ButtonProps } from "antd";
import styles from "./styles.module.css";

export interface ButtonCustomProps extends ButtonProps {
	secondary?: boolean;
}

const Button = (props: ButtonCustomProps) => {
	const { secondary } = props;

	const getStyle = () => {
		return styles.antBtnCustom + " " + (secondary && " " + styles.btnSecondary) + " " + props.className;
	}

	return (
		<ButtonAntd
			{...props}
			className={getStyle()}
			style={{
				...props.style,
			}}
		/>
	);
};

export default Button;
