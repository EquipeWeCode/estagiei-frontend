import Button, { ButtonCustomProps } from "../Button/Button";
import history from "@/utils/history";
import { useTranslation } from "react-i18next";

const ButtonVoltar = (props: ButtonCustomProps) => {
	const { t } = useTranslation();

	const voltar = () => {
		history.back();
	};

	return (
		<Button {...props} onClick={voltar}>
			{t("go_back")}
		</Button>
	);
};

export default ButtonVoltar;
