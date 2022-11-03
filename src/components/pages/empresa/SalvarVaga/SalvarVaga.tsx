import ButtonDrawer from "@/components/common/ButtonDrawer";
import { VagaType } from "@/types/vagasTypes";
import { EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export type SalvarVagaProps = {
	vaga?: VagaType;
	posOperacao?: () => void;
};

const SalvarVaga = ({ vaga, posOperacao }: SalvarVagaProps) => {
	const isEdicao = vaga?.codVaga !== undefined;
	const { t } = useTranslation();

	return (
		<ButtonDrawer
			icon={isEdicao ? <EditFilled /> : <PlusOutlined />}
			titleDrawer={isEdicao ? `${t("edit_job")} - ${vaga?.titulo}` : t("new_job")}
		></ButtonDrawer>
	);
};

export default SalvarVaga;
