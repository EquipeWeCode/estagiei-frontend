import { i18n } from "@/translations/i18n";
import { Switch, Image, Tooltip } from "antd";
import styles from "./styles.module.css";

import usaIcon from "@/assets/bandeiras/usa.svg";
import brazilIcon from "@/assets/bandeiras/brazil.svg";
import { useState } from "react";
import { urlIconsType } from "@/types/urlIconsType";
import { useTranslation } from "react-i18next";

const urlIcons: urlIconsType = {
	pt: brazilIcon,
	en: usaIcon,
};

const TraducaoBtn = () => {
	const [iconUrl, setIconUrl] = useState("pt");

    const { t } = useTranslation();

	const onChangeFlag = (language: string) => {
		i18n.changeLanguage(language);
		setIconUrl(language);
	};

	const onChangeSwitch = (boolParam: boolean) => {
		boolParam ? onChangeFlag("pt") : onChangeFlag("en");
	};

	const stylesJs = {
		backgroundImage: `url(${urlIcons[iconUrl]})`,
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
	};

	return (
		<Tooltip title={t("change_language")}>
				<Switch
					defaultChecked
					onChange={onChangeSwitch}
					className={styles.switchDiv}
					style={stylesJs}
				/>
		</Tooltip>
	);
};

export default TraducaoBtn;
