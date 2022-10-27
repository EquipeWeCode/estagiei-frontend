import Button from "@/components/common/Button";
import Drawer from "@/components/common/Drawer";
import { ButtonProps } from "antd";
import React from "react";
import { DEFAULT } from "../Drawer/Drawer";

export interface ButtonDrawerProps extends ButtonProps {
	title?: string;
	placement?: "left" | "right" | "top" | "bottom";
	sizeDrawer?: "default" | "large" | "fullscreen";
	children?: React.ReactNode;
	label?: string;
	secondary?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

class ButtonDrawer extends React.Component<ButtonDrawerProps> {
	state = {
		visible: false,
	};

	abreDrawer = () => {
		const abrir = () => this.setState({ visible: true });
		if (this.props.onOpen) {
			this.props.onOpen();
		}
		abrir();
		document.body.style.overflow = "hidden";
	};

	fechaDrawer = () => {
		const fechar = () => this.setState({ visible: false });
		if (this.props.onClose) {
			this.props.onClose();
		}
		fechar();
		document.body.style.overflow = "initial";
	};

	componentDidMount() {
		document.body.style.overflow = "initial";
	}

	componentWillUnmount(): void {
		document.body.style.overflow = "initial";
	}

	render() {
		const {
			title,
			disabled,
			type = undefined,
			icon = null,
			ghost = false,
			block = false,
			sizeDrawer = DEFAULT,
			style,
			secondary,
		} = this.props;

		return (
			<>
				<Button
					style={style}
					onClick={this.abreDrawer}
					title={title}
					disabled={disabled}
					ghost={ghost}
					block={block}
					icon={icon}
					type={type}
					label={this.props.label}
					secondary={secondary}
				/>
				<Drawer
					size={sizeDrawer}
					visible={this.state.visible}
					title={title}
					onClose={this.fechaDrawer}
				>
					{this.props.children}
				</Drawer>
			</>
		);
	}
}

export default ButtonDrawer;
