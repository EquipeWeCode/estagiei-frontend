import { useTranslation } from "react-i18next";

const Footer = () => {

  const { t } = useTranslation();

	return <div className="footer-title">{t("footer_title")}</div>;
};

export default Footer;
