import GoogleLogout from "@/components/common/GoogleLogout";
import { useAuth } from "@/contexts/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = (): JSX.Element => {
	const { t } = useTranslation();
	const { user, signed } = useAuth();
	const navigate = useNavigate();

	useEffect((): void => {
		if (!signed) {
			navigate("/login");
		}
	}, [signed]);

	return (
		<>
			<h1>{t("welcome") + `, ${user.name}`}</h1>
			{t("date_format", { date: new Date() })}

			<GoogleLogout />
		</>
	);
};

export default HomePage;
