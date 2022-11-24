import Button from "@/components/common/Button";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import { getEndereco } from "@/components/common/CardVagas/DescricaoVaga/DescricaoVaga";
import DetailsItem from "@/components/common/DetailsItem";
import ImageNotFound from "@/components/common/ImageNotFound";
import Row from "@/components/common/Row";
import TabelaContatos from "@/components/common/TabelaContatos";
import TabelaExpProfissional from "@/components/common/TabelaExpProfissional";
import TabelaHistEscolar from "@/components/common/TabelaHistEscolar";
import { nvlEscolaridadeEnum } from "@/constants/enums";
import { getEstudante } from "@/services/estudante";
import { UserType } from "@/types/userTypes";
import { cpfCnpjMask, dateMask } from "@/utils/masks";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { Col, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EdicaoEstudante from "../EdicaoEstudante";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import styles from "./styles.module.css";

const DadosBasicos = ({ codEstudante, isVisualizacao }: PerfilEstudanteProps) => {
	const { t } = useTranslation();
	const [user, setUser] = useState({} as UserType);
	const [isEdicao, setIsEdicao] = useState(false);

	const fetchEstudante = async () => {
		const { data, status } = await getEstudante(codEstudante);
		if (status === 200) {
			setUser(data);
		}
	};

	const posSalvarEstudante = () => {
		setIsEdicao(false);
		fetchEstudante();
	};

	useEffect(() => {
		if (codEstudante) {
			fetchEstudante();
		}
	}, [codEstudante]);

	return (
		<>
			<Row justify="end">
				{!isVisualizacao && !isEdicao ? (
					<Col>
						<Button
							secondary
							icon={<EditFilled />}
							onClick={() => setIsEdicao(!isEdicao)}
							label={t("edit")}
						/>
					</Col>
				) : (
					!isVisualizacao &&
					isEdicao && (
						<Col>
							<Space>
								<Button icon={<CloseOutlined />} onClick={() => setIsEdicao(!isEdicao)} />
							</Space>
						</Col>
					)
				)}
				{isVisualizacao && <ButtonVoltar />}
			</Row>

			{!isEdicao ? (
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

					<Row rowtitle={t("contacts")} justify="center" style={{ margin: "16px 0" }}>
						<Col span={12} style={{ textAlign: "center" }}>
							<TabelaContatos contatos={user.contatos} />
						</Col>
					</Row>

					<Row rowtitle={t("student_experience")} justify="center" style={{ margin: "16px 0" }}>
						<Col span={20} style={{ textAlign: "center" }}>
							<TabelaExpProfissional experiencias={user.experienciaProfissional} />
						</Col>
					</Row>

					<Row rowtitle={t("studentHistoric")} justify="center" style={{ margin: "16px 0" }}>
						<Col span={20} style={{ textAlign: "center" }}>
							<TabelaHistEscolar historico={user.historicoEscolar} />
						</Col>
					</Row>
				</>
			) : (
				<EdicaoEstudante user={user} posSalvarEstudante={posSalvarEstudante} />
			)}
		</>
	);
};

export default DadosBasicos;
