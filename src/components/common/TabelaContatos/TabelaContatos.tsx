import { CELULAR, tipoContatoEnum } from "@/constants/enums";
import { contatosType } from "@/types/contatoType";
import { ContatoType } from "@/types/userTypes";
import { phoneMask } from "@/utils/masks";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

type TabelaContatosProps = {
	// Path: src\components\common\TabelaContatos\TabelaContatos.tsx
	// Type: React.FC<{ contatos: Contato[]; }>
	contatos: ContatoType[] | undefined;
};

const TabelaContatos = (props: TabelaContatosProps) => {
	const { contatos } = props;
	const { t } = useTranslation();
	const columns = [
		{
			title: t("type"),
			dataIndex: "tipoContato",
			render: (tipoContato: string) => {
				return tipoContatoEnum.get(tipoContato);
			},
		},
		{
			title: t("description"),
			dataIndex: "descContato",
			render: (descContato: string) => {
				return descContato ? descContato : " - ";
			},
		},
		{
			title: t("value"),
			dataIndex: "valorContato",
			render: (text: string, data: contatosType) => {
				return data?.tipoContato === CELULAR ? phoneMask(text) : text;
			},
		},
	];

	const contatosDS = contatos?.map(contato => {
		return {
			key: contato.codContato,
			...contato,
		};
	});

	return (
		<Table
			bordered={true}
			size={"small"}
			columns={columns}
			dataSource={contatosDS}
			pagination={false}
		/>
	);
};

export default TabelaContatos;
