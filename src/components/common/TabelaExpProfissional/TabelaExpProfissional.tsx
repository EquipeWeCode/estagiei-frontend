import { experienciaProfissionalType } from "@/types/experienciaProfissionalType";
import { dateMask } from "@/utils/masks";
import { Table } from "antd";
import { AlignType } from "rc-table/lib/interface";
import { useTranslation } from "react-i18next";
import { TextArea } from "../Input/Input";

type TabelaExpProfissionalProps = {
	experiencias: experienciaProfissionalType[] | undefined;
};

const TabelaExpProfissional = (props: TabelaExpProfissionalProps) => {
	const { experiencias } = props;
	const { t } = useTranslation();
	const columns = [
		{
			title: t("company"),
			dataIndex: "nomeEmpresa",
		},
		{
			title: t("role"),
			dataIndex: "cargo",
		},
		{
			title: t("description"),
			dataIndex: "descricao",
			render: (text: string) => {
				return text && <TextArea rows={1} value={text} />;
			},
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
	];

	const experienciasDS = experiencias?.map(exp => {
		return {
			key: exp.codExpProfissional,
			...exp,
		};
	});

	return experienciasDS && experienciasDS?.length > 0 ? (
		<Table
			bordered={true}
			size={"small"}
			columns={columns}
			dataSource={experienciasDS}
			pagination={{
				pageSize: 3,
				position: ["bottomRight"],
				hideOnSinglePage: true,
			}}
		/>
	) : (
		<p>{t("not_informed")}</p>
	);
};
export default TabelaExpProfissional;
