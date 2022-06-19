import {
	GoogleLogin as GoogLogin,
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";
import { refreshTokenSetup } from "@/utils/refreshToken";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { postLogin } from "@/services/loginGoogle";
import { StudentType, UserGoogleRequest, UserGoogleType } from "@/types/userTypes";
import { useAuth } from "@/contexts/auth";
import { getEstudante } from "@/services/estudante";

const GoogleLogin = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setUser, setSigned, user } = useAuth();

	const onSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline): Promise<any> => {
		const resOnline = res as GoogleLoginResponse;

		const user: UserGoogleRequest = {
			token: resOnline.tokenId,
		};

		const response = await postLogin(user);

		const newUser = {
			codEstudante: resOnline.profileObj.googleId,
		};

		if (response.status === 200) {
			const estudanteBuscado = await getEstudante(newUser.codEstudante);
			const data: StudentType = estudanteBuscado.data;
			setUser(data);
			setSigned(true);
			refreshTokenSetup(resOnline);
			navigate("/");
		} else {
			setSigned(false);
			setUser({} as StudentType);
			alert("Erro ao validar o login no servidor");
		}
	};

	const onFailure = (res: GoogleLoginResponse) => {
		setSigned(false);
		setUser({} as UserGoogleType);
		console.log("Login falhou:", res);
	};

	return (
		<div>
			<GoogLogin
				clientId={import.meta.env.VITE_CLIENT_ID}
				buttonText={t("login_with_google")}
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
				isSignedIn={true}
				theme={"dark"}
			/>
		</div>
	);
};

export default GoogleLogin;
