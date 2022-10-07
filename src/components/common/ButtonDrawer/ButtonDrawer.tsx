import React from "react";
import Button from "@/components/common/Button";
import Drawer from "@/components/common/Drawer";
import { DEFAULT } from "../Drawer/Drawer";
import { ButtonProps } from "antd";

export interface ButtonDrawerProps extends ButtonProps {
	title?: string;
	placement?: "left" | "right" | "top" | "bottom";
	sizeDrawer?: "default" | "large" | "fullscreen";
	children?: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
}

class ButtonDrawer extends React.Component<ButtonDrawerProps> {
	state = {
		DrawerOpen: false,
	};

	abreDrawer = () => {
		const abrir = () => this.setState({ DrawerOpen: true });
		if (this.props.onOpen) {
			this.props.onOpen();
		}
		abrir();
	};

	fechaDrawer = () => {
		this.setState({ DrawerOpen: false }, this.props.onClose && this.props.onClose);
	};

	render() {
		const {
			title,
			disabled,
			type = undefined,
			icon = null,
			ghost = false,
			block = false,
			sizeDrawer = DEFAULT,
		} = this.props;

		return (
			<>
				<Button
					onClick={this.abreDrawer}
					// onOk={this.abreDrawer}
					title={title}
					disabled={disabled}
					ghost={ghost}
					block={block}
					icon={icon}
					type={type}
				/>
				<Drawer
					size={sizeDrawer}
					visible={this.state.DrawerOpen}
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
