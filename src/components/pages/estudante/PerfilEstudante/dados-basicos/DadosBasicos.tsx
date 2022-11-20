import { getEndereco } from "@/components/common/CardVagas/DescricaoVaga/DescricaoVaga";
import DetailsItem from "@/components/common/DetailsItem";
import ImageNotFound from "@/components/common/ImageNotFound";
import Row from "@/components/common/Row";
import TabelaContatos from "@/components/common/TabelaContatos";
import { nvlEscolaridadeEnum } from "@/constants/enums";
import { cpfCnpjMask, dateMask } from "@/utils/masks";
import { Col, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import styles from "./styles.module.css";

const DadosBasicos = ({ user, isVisualizacao }: PerfilEstudanteProps) => {
	const { t } = useTranslation();

	return (
		<>
			<Row justify="center" align="middle">
				<span className={styles.containerFoto}>
					{user.avatar ? <img src={user.avatar} alt="Avatar" /> : <ImageNotFound width={100} />}
				</span>
			</Row>
			<Row align="middle" style={{ marginTop: "10px" }} gutter={[0, 12]}>
				<DetailsItem label={t("name")} value={user.nome} />
				<DetailsItem label="E-mail" value={user.email} />
				<DetailsItem label={t("birth_date")} value={dateMask(user.dataNascimento)} />
				<DetailsItem label="CPF" value={cpfCnpjMask(user.cpf)} />
				<DetailsItem label="RG" value={user.rg} />
				<DetailsItem
					label={t("student_level")}
					value={nvlEscolaridadeEnum.get(user.nvlEscolaridade)}
				/>
				<DetailsItem
					md={24}
					label={t("address")}
					value={
						user?.endereco?.codEndereco ? getEndereco(user?.endereco, true) : t("not_informed")
					}
				/>
				<DetailsItem
					md={24}
					label={"Soft Skills"}
					value={user?.competencias?.map((c, idx) => {
						return <Tag key={idx}>{c.descricaoCompetencia}</Tag>;
					})}
				/>
			</Row>

			<Row rowTitle={t("contacts")} justify="center" style={{ marginTop: "10px" }}>
				<Col span={12} style={{ textAlign: "center" }}>
					<TabelaContatos contatos={user.contatos} />
				</Col>
			</Row>
		</>
	);
};

export default DadosBasicos;
