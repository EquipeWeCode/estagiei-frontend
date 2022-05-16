import { useAuth } from "@/contexts/auth";
import { UserGoogleType } from "@/types/userTypes";
import { GoogleLogout as GoogLogout } from "react-google-login";
import { useTranslation } from "react-i18next";

const GoogleLogout = () => {
	const { t } = useTranslation();

	const { setSigned, setUser } = useAuth();

	const onSuccess = () => {
		localStorage.removeItem("token");
    localStorage.removeItem("authToken");
		setSigned(false);
		setUser({} as UserGoogleType);
	};

	return (
		<div>
			<GoogLogout
				clientId={import.meta.env.VITE_CLIENT_ID}
				buttonText={t("logout_button")}
				onLogoutSuccess={onSuccess}
			></GoogLogout>
		</div>
	);
};

export default GoogleLogout;
