import { statusHistEscolarEnum } from "@/constants/enums";
import { historicoEscolarType } from "@/types/historicoEscolarType";
import { dateMask } from "@/utils/masks";
import { Table } from "antd";
import { AlignType } from "rc-table/lib/interface";
import { useTranslation } from "react-i18next";

type TabelaHistEscolarProps = {
	historico: historicoEscolarType[] | undefined;
};

const TabelaHistEscolar = (props: TabelaHistEscolarProps) => {
	const { historico } = props;
	const { t } = useTranslation();
	const columns = [
		{
			title: t("course"),
			dataIndex: "curso",
		},
		{
			title: t("student_level"),
			dataIndex: "nvlEscolaridade",
		},
		{
			title: t("institutionName"),
			dataIndex: "instEnsino",
		},
		{
			title: t("dateStart"),
			dataIndex: "dataInicio",
			align: "center" as AlignType,
			render: (text: string) => {
				return text ? dateMask(text) : "-";
			},
		},
		{
			title: t("dateEnd"),
			dataIndex: "dataFim",
			align: "center" as AlignType,
			render: (text: string) => {
				return text ? dateMask(text) : "-";
			},
		},
		{
			title: "Status",
			dataIndex: "status",
			align: "center" as AlignType,
			render: (text: string) => {
				return text ? statusHistEscolarEnum.get(text) : " - ";
			},
		},
	];

	const historicoDS = historico?.map(hist => {
		return {
			key: hist.codHistEscolar,
			...hist,
		};
	});

	return (
		<Table
			bordered={true}
			size={"small"}
			columns={columns}
			dataSource={historicoDS}
			pagination={{
				pageSize: 3,
				position: ["bottomRight"],
				hideOnSinglePage: true,
			}}
		/>
	);
};
export default TabelaHistEscolar;
