import { Drawer as DrawerAntd, DrawerProps } from "antd";
import { KeyboardEvent, MouseEvent } from "react";

export const DEFAULT = "default";
export const LARGE = "large";
export const FULLSCREEN = "fullscreen";

export type DrawerCustomProps = Omit<DrawerProps, "size"> & {
	size?: "default" | "large" | "fullscreen";
};

export type DrawerSize = typeof DEFAULT | typeof LARGE | typeof FULLSCREEN;

const Drawer = (props: DrawerCustomProps) => {
	const {
		children,
		onClose,
		title,
		placement = "right",
		style,
		closable = true,
		visible,
		getContainer = false,
		size = DEFAULT,
	} = props;

	const sizeComponent = size === FULLSCREEN ? "95%" : LARGE ? "736px" : "378px";
	const isMobile = window.innerWidth <= 768;

	return (
		<DrawerAntd
			title={title}
			placement={placement}
			closable={closable}
			onClose={onClose}
			visible={visible}
			getContainer={getContainer}
			style={style}
			width={isMobile ? "100%" : sizeComponent}
		>
			{children}
		</DrawerAntd>
	);
};

export default Drawer;
