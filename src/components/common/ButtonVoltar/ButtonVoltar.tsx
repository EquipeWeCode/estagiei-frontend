import history from "@/utils/history";
import { useTranslation } from "react-i18next";
import Button, { ButtonCustomProps } from "../Button/Button";

const ButtonVoltar = (props: ButtonCustomProps) => {
	const { onClick } = props;
	const { t } = useTranslation();

	const voltar = () => {
		onClick?.();
		history.back();
	};

	return (
		<Button {...props} onClick={voltar}>
			{t("go_back")}
		</Button>
	);
};

export default ButtonVoltar;
