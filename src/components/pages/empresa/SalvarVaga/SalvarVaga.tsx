import ButtonDrawer from "@/components/common/ButtonDrawer";
import { VagaType } from "@/types/vagasTypes";
import { EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

export type SalvarVagaProps = {
	vaga?: VagaType;
	posOperacao?: () => void;
};

const SalvarVaga = ({ vaga, posOperacao }: SalvarVagaProps) => {
	const isEdicao = vaga?.codVaga !== undefined;
	const { t } = useTranslation();

	return (
		<Tooltip
			title={isEdicao ? t("edit_job") : t("new_job")}
			overlayStyle={{ zIndex: "1" }}
			placement={isEdicao ? "top" : "bottom"}
		>
			<span>
				<ButtonDrawer
					icon={isEdicao ? <EditFilled /> : <PlusOutlined />}
					titleDrawer={isEdicao ? `${t("edit_job")} - ${vaga?.titulo}` : t("new_job")}
				></ButtonDrawer>
			</span>
		</Tooltip>
	);
};

export default SalvarVaga;
