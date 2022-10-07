import React, { useState } from "react";
import Button from "@/components/common/Button";
import Drawer from "@/components/common/Drawer";
import { DEFAULT } from "../Drawer/Drawer";
import { ButtonProps } from "antd";

export interface ButtonDrawerProps extends ButtonProps {
	title?: string;
	placement?: "left" | "right" | "top" | "bottom";
	sizeDrawer?: "default" | "large" | "fullscreen";
	label?: string;
	children?: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
}

const ButtonDrawer = (props: ButtonDrawerProps) => {
	const {
		title,
		disabled,
		type = undefined,
		icon = null,
		ghost = false,
		block = false,
		label,
		sizeDrawer = DEFAULT,
	} = props;

	const [visible, setVisible] = useState(false);

	const abreDrawer = () => {
		const abrir = () => setVisible(true);
		if (props.onOpen) {
			props.onOpen();
		}
		abrir();
	};

	const fechaDrawer = () => {
		setVisible(false);
	};

	return (
		<>
			<Button
				onClick={abreDrawer}
				title={title}
				disabled={disabled}
				ghost={ghost}
				block={block}
				icon={icon}
				type={type}
				label={label}
			/>
			<Drawer size={sizeDrawer} visible={visible} title={title} onClose={fechaDrawer}>
				{props.children}
			</Drawer>
		</>
	);
};

export default ButtonDrawer;
