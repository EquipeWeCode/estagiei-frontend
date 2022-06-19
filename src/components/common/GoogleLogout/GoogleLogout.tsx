import { useAuth } from "@/contexts/auth";
import { StudentType } from "@/types/userTypes";
import { GoogleLogout as GoogLogout } from "react-google-login";
import { useTranslation } from "react-i18next";

const GoogleLogout = () => {
	const { t } = useTranslation();

	const { setSigned, setUser } = useAuth();

	const onSuccess = () => {
    // localStorage.removeItem("token");
		setSigned(false);
		setUser({} as StudentType);
	};

	return (
		<div>
			<GoogLogout
        		className="google-logout"
				clientId={import.meta.env.VITE_CLIENT_ID}
				buttonText={t("logout_button")}
				onLogoutSuccess={onSuccess}
			></GoogLogout>
		</div>
	);
};

export default GoogleLogout;
