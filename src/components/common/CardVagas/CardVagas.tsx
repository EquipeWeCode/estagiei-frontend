import { useRef } from "react";
import { VagaType } from "@/types/vagasTypes";
import { Col, Empty, Tag, Row } from "antd";
import { CompetenciaType } from "@/types/competenciaType";
import { capitalizaPriLetraDeCadaPalavra, ellipsisText } from "@/utils/masks";
import { COLORS } from "@/constants/colors";
import { Link } from "react-router-dom";
import ButtonDrawer from "../ButtonDrawer";
import { useAuth } from "@/contexts/auth";
import { useTranslation } from "react-i18next";
import DescricaoVaga from "@/components/pages/DescricaoVaga";
import styles from "./styles.module.css";
import ImageNotFound from "../ImageNotFound";
import { realMask } from "@/utils/masks";

interface CardVagasProps {
	vagas: VagaType[];
	competenciasEstudante: CompetenciaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const { user } = useAuth();
	const { t } = useTranslation();

	const refDrawer = useRef<ButtonDrawer>(null);

	const retornaCorTag = (competencia: CompetenciaType): string => {
		return props.competenciasEstudante.find(
			comp => comp.codCompetencia === competencia.codCompetencia
		)
			? COLORS.argb.primary_color
			: "default";
	};

	const abreDrawer = () => {
		refDrawer?.current?.abreDrawer();
	};

	return (
		<>
			{props?.vagas && props?.vagas?.length > 0 ? (
				props?.vagas?.map((vaga: VagaType) => (
					<Row key={vaga.codVaga} className={styles.containerVaga} align="middle">
						<Link to="/empresa/profile">
							<Col className={styles.colImage}>
								{vaga?.empresa?.avatar ? (
									<img
										src={vaga?.empresa?.avatar}
										alt="avatar-company"
										width={100}
										height={100}
										style={{ borderRadius: "5px" }}
									/>
								) : (
									<ImageNotFound width={100} height={100} />
								)}
							</Col>
						</Link>
						<Col className={styles.content} onClick={abreDrawer}>
							<div className={styles.vagaTitulo}>
								<h3 style={{ display: "inline-block" }}>
									<strong>{vaga.titulo} </strong>
								</h3>
								<span style={{ color: "var(--primary-color)" }}>
									{vaga.empresa && capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
								</span>
							</div>
							<p className={styles.colDesc}>{ellipsisText(vaga.descricao, 75)}</p>
							<p style={{ fontSize: "1rem" }}>
									{realMask(vaga?.salario)}
							</p>
							{vaga.competencias &&
								vaga.competencias.map((competencia: CompetenciaType) => (
									<Tag
										style={{
											borderRadius: "5px",
											padding: "0.2rem 0.4rem",
											marginBottom: "0.5rem",
										}}
										key={competencia.codCompetencia}
										color={retornaCorTag(competencia)}
									>
										{competencia.descricaoCompetencia}
									</Tag>
								))}
						</Col>
						<ButtonDrawer
							ref={refDrawer}
							label={t("show_details")}
							title={`${vaga.titulo} - ${vaga?.empresa?.nomeFantasia}`}
						>
							<DescricaoVaga user={user} vaga={vaga} key={vaga?.codVaga} />
						</ButtonDrawer>
					</Row>
				))
			) : (
				<Empty description="Nenhuma vaga encontrada." />
			)}
		</>
	);
};

export default CardVagas;
