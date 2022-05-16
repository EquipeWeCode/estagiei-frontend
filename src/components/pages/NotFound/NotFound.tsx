import { useTranslation } from "react-i18next";

const NotFound = () => {

  const { t } = useTranslation();

  return (
    <div>{t("not_found")}</div>
  )
}

export default NotFound;