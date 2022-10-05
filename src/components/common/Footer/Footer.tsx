import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const Footer = () => {

  const { t } = useTranslation();
  
	return <footer className={styles.footerTitle}>{t("footer_title")}</footer>;
};

export default Footer;
