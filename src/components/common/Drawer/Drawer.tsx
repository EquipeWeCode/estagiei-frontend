import { Drawer as DrawerAntd, DrawerProps } from "antd";
import { useState } from "react";

export const DEFAULT = "default";
export const LARGE = "large";
export const FULLSCREEN = "fullscreen";
import styles from "./styles.module.scss";

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

	const [isMobile, setIsMobile] = useState(false);

	window.addEventListener("resize", () => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	});

	const sizeComponent = size === FULLSCREEN ? "95%" : LARGE ? "736px" : "378px";

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
			className={styles.drawer}
		>
			{children}
		</DrawerAntd>
	);
};

export default Drawer;
