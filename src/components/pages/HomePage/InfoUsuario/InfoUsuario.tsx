import { CompetenciaType } from "@/types/competenciaType";
import { StudentType } from "@/types/userTypes";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";

interface InfoUsuarioProps {
	user: StudentType;
}

const InfoUsuario = ({ user }: InfoUsuarioProps): JSX.Element => {
	const { t } = useTranslation();

	return (
		<>
			<h2>{t("info_registration")}</h2>
			<img src={user.avatar} alt={t("user")} />
			<Row className="info-user" justify="space-between">
				<Col md={12}>
					<strong>{t("name")}: </strong> {capitalizaPriLetraDeCadaPalavra(user.nome)}
				</Col>
				<Col md={12}>
					<strong>E-mail: </strong> {user.email}
				</Col>
				{user.cpf && (
					<Col md={12}>
						<strong>CPF: </strong> {user.cpf}
					</Col>
				)}
				{user.instEnsino && (
					<Col md={12}>
						<strong>{t("education")}: </strong>
						{capitalizaPriLetraDeCadaPalavra(user.instEnsino)}
					</Col>
				)}
				{user.rg && (
					<Col md={11}>
						<strong>RG:</strong> {capitalizaPriLetraDeCadaPalavra(user.rg)}
					</Col>
				)}
				{user.competencias && (
					<Col style={{ marginTop: "1rem" }} md={20}>
						{user.competencias.map((competencia: CompetenciaType) => (
							<Tag key={competencia.codCompetencia}>
								{capitalizaPriLetraDeCadaPalavra(competencia.descricaoCompetencia)}
							</Tag>
						))}
					</Col>
				)}
			</Row>
		</>
	);
};

export default InfoUsuario;
