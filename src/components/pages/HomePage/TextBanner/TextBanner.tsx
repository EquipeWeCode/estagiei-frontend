import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const TextBanner = () => {
	const { t } = useTranslation();

	return (
		<>
			<span>{t("banner_text")}</span>
			<span className={styles.subtitle}>{t("banner_subtitle")}</span>
		</>
	);
};

export default TextBanner;
