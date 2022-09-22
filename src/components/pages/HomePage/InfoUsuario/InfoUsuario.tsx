import Button from "@/components/common/Button";
import { CompetenciaType } from "@/types/competenciaType";
import { UserType } from "@/types/userTypes";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface InfoUsuarioProps {
	user: UserType;
}
const InfoUsuario = ({ user }: InfoUsuarioProps): JSX.Element => {
  const { t } = useTranslation();
  
	return (
		<>
			<Col className="container-info-user" md={15}>
				<Row justify="end">
					<Button type="primary" ghost>
						<Link to="/cadastro/estudante">{t("edit_profile")}</Link>
					</Button>
				</Row>
				<h2>{t("info_registration")}</h2>
				<img src={user.avatar} alt={t("user")} />
				<Row className="info-user" justify="space-between">
					<Col md={10}>
						<span>
							<strong>{t("name")}: </strong> {capitalizaPriLetraDeCadaPalavra(user.nome)}
						</span>
					</Col>
					{user.cpf && (
						<Col md={10}>
							<span>
								<strong>CPF: </strong> {user.cpf}
							</span>
						</Col>
					)}
					{user.rg && (
						<Col md={10}>
							<span>
								<strong>RG:</strong> {user.rg}
							</span>
						</Col>
					)}
					{user.dataNascimento && (
						<Col md={10}>
							<span>
								<strong>{t("birth_date")}: </strong>
								{t("date_format", { date: new Date(user.dataNascimento+"T00:00") })}
							</span>
						</Col>
					)}
					<Col md={10}>
						<span>
							<strong>E-mail: </strong> {user.email}
						</span>
					</Col>
					{user.instEnsino && (
						<Col md={10}>
							<span>
								<strong>{t("education")}: </strong>
								{capitalizaPriLetraDeCadaPalavra(user.instEnsino)}
							</span>
						</Col>
					)}
					{user.competencias && user.competencias.length > 0 && (
						<Row style={{ marginTop: "1rem" }} justify="start">
							<span>
								<strong>{t("skills") + ": "}</strong>
								{user.competencias.map((competencia: CompetenciaType) => (
									<Tag
										key={competencia.codCompetencia}
										color="#c045f4"
										style={{
											borderRadius: "0.5rem",
											padding: "0.2rem 0.4rem",
											marginBottom: "0.3rem",
										}}
									>
										{competencia.descricaoCompetencia}
									</Tag>
								))}
							</span>
						</Row>
					)}
				</Row>
			</Col>
		</>
	);
};

export default InfoUsuario;
