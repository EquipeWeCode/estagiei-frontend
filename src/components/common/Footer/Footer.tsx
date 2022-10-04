import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();
  
	return <footer className="footer-title">{t("footer_title")}</footer>;
};

export default Footer;
