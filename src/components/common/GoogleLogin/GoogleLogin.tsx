import {
	GoogleLogin as GoogLogin,
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";
import { refreshTokenSetup } from "@/utils/refreshToken";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { postLogin } from "@/services/loginGoogle";
import { UserGoogleRequest, UserGoogleType } from "@/types/userTypes";
import { useAuth } from "@/contexts/auth";

const GoogleLogin = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setUser, setSigned } = useAuth();

	const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<any> => {
		const resOnline = res as GoogleLoginResponse;
		// const resOffline = res as GoogleLoginResponseOffline;

		const user: UserGoogleRequest = {
			token: resOnline.tokenId,
		};

		const response = await postLogin(user);

		const newUser = {
			id: resOnline.profileObj.googleId,
			email: resOnline.profileObj.email,
			name: resOnline.profileObj.name,
			avatar: resOnline.profileObj.imageUrl,
		};

		if (response.status === 200) {
			// localStorage.setItem("token", resOnline.tokenId);
			// localStorage.setItem("user", JSON.stringify(newUser));
			setSigned(true);
			setUser(newUser);
			navigate("/");
			refreshTokenSetup(resOnline);
		} else {
      setSigned(false);
      setUser({} as UserGoogleType);
			alert("Erro ao validar o login no servidor");
		}
	};

	const onFailure = (res: GoogleLoginResponse) => {
    setSigned(false);
    setUser({} as UserGoogleType);
		console.log("Login failed:", res);
		alert(`Falha no login`);
	};

	return (
		<div>
			<GoogLogin
				clientId={import.meta.env.VITE_CLIENT_ID}
				buttonText={t("login_with_google")}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
				// theme="dark"
				// style={{ marginTop: "100px" }}
				isSignedIn={true}
			/>
		</div>
	);
};

export default GoogleLogin;
