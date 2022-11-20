import DescricaoVaga from "@/components/common/CardVagas/DescricaoVaga";
import SalvarVaga from "@/components/pages/empresa/SalvarVaga";
import { CANCELADO_ESTUDANTE, DESATIVADO } from "@/constants/enums";
import { useAuth } from "@/contexts/auth";
import { CandidaturaType } from "@/types/candidaturaType";
import { CompetenciaType } from "@/types/competenciaType";
import { VagaType } from "@/types/vagasTypes";
import { capitalizaPriLetraDeCadaPalavra, dateMask, ellipsisText, realMask } from "@/utils/masks";
import { ClockCircleOutlined, EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Empty, Row, Tag, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ButtonDrawer from "../ButtonDrawer";
import { getTagColor } from "../CarouselVagas/CarouselVagas";
import ImageNotFound from "../ImageNotFound";
import styles from "./styles.module.css";

interface CardVagasProps {
	vagas: VagaType[];
	candidaturas?: CandidaturaType[];
	isEmpresa?: boolean;
	fetchCandidaturas?: () => void;
	fetchVagas?: () => void;
}

export interface VagaComCandidaturaType extends VagaType {
	isCandidatada?: boolean;
	existeCandidatura?: boolean;
}

export const isVagaRecomendada = (
	vaga: VagaComCandidaturaType,
	competenciasEstudante: CompetenciaType[] | undefined
) => {
	const { competencias } = vaga;
	const competenciasVaga = competencias?.map(competencia => competencia.codCompetencia);
	const competenciasCandidato = competenciasEstudante?.map(
		competencia => competencia.codCompetencia
	);
	return competenciasVaga?.some(competenciaVaga =>
		competenciasCandidato?.includes(competenciaVaga)
	);
};

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const { user } = useAuth();
	const { competencias: competenciasEstudante } = user;
	const { t } = useTranslation();

	const { vagas = [], candidaturas = [], fetchCandidaturas, isEmpresa = false, fetchVagas } = props;

	const vagasComCandidatura: VagaComCandidaturaType[] = vagas?.map(vaga => {
		const candidatura = candidaturas.find(candidatura => candidatura.codVaga === vaga.codVaga);
		const isCandidatada =
			candidatura && ![CANCELADO_ESTUDANTE, DESATIVADO].includes(candidatura?.status);
		const existeCandidatura = candidatura ? true : false;
		return {
			...vaga,
			isCandidatada,
			existeCandidatura,
		};
	});

	const getLocalVaga = (vaga: VagaComCandidaturaType) => {
		if (vaga?.modalidade === "REMOTO") {
			return t("remote");
		} else if (!vaga?.endereco?.estado) {
			return t("not_informed");
		} else {
			return (
				capitalizaPriLetraDeCadaPalavra(vaga?.endereco?.cidade) +
				" " +
				(vaga?.endereco?.estado && "  / " + vaga?.endereco?.estado)
			);
		}
	};

	return (
		<>
			{vagasComCandidatura && vagasComCandidatura?.length > 0 ? (
				vagasComCandidatura?.map((vaga: VagaComCandidaturaType) => (
					<Row key={vaga.codVaga} className={styles.containerVaga} align="middle">
						<Col className={styles.colImage}>
							<Link to={`/empresa/perfil/${vaga?.empresa?.codEmpresa}`}>
								{!isEmpresa &&
									(vaga?.empresa?.avatar ? (
										<>
											<img
												src={vaga?.empresa?.avatar}
												alt="avatar-company"
												className={styles.companyImage}
												width={100}
												height={100}
											/>
										</>
									) : (
										<ImageNotFound width={100} height={100} className={styles.companyImage} />
									))}
							</Link>
						</Col>
						<Col className={styles.content}>
							<div className={styles.vagaTituloContainer}>
								<div className={styles.vagaTitulo}>
									<h3>{vaga.titulo}</h3>
									<span>
										<Tag className={styles.tagModalidade} color={getTagColor(vaga.modalidade)}>
											{vaga.modalidade}
										</Tag>
										<h4 style={{ display: "inline-block" }}>{vaga.cargaHoraria}h</h4>
									</span>
								</div>
								<div style={{ color: "var(--primary-color)" }}>
									<Link to={`/empresa/perfil/${vaga?.empresa?.codEmpresa}`}>
										{vaga.empresa && capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
									</Link>
								</div>
							</div>
							<p className={styles.colDesc}>{ellipsisText(vaga.descricao, 75)}</p>
							<div>
								<p style={{ fontSize: "1rem", display: "inline-block" }}>
									{vaga?.salario ? realMask(vaga?.salario) : t("not_informed")}
								</p>
								{isVagaRecomendada(vaga, competenciasEstudante) && (
									<Tag color="purple" style={{ marginLeft: "1rem" }}>
										{t("recommended")}
									</Tag>
								)}
								{vaga?.isCandidatada && (
									<span style={{ marginLeft: "0.5rem" }}>
										<Tag color={"success"}>{t("applied")}</Tag>
									</span>
								)}
								{isEmpresa && !vaga.indAtivo && (
									<span style={{ marginLeft: "0.5rem" }}>
										<Tag color={"error"}>{t("inactive")}</Tag>
									</span>
								)}
							</div>
							<div className={styles.locationAuditoria}>
								<span>
									<EnvironmentOutlined /> {getLocalVaga(vaga)}
								</span>
								<span>
									<ClockCircleOutlined /> {dateMask(vaga?.auditoria?.dataInclusao)}
								</span>
							</div>
						</Col>
						{isEmpresa && (
							<span style={{ marginRight: "10px" }}>
								<SalvarVaga fetchVagas={fetchVagas} vaga={vaga} />
							</span>
						)}
						<Tooltip title={t("show_details")} overlayStyle={{ zIndex: "1" }}>
							<span>
								<ButtonDrawer
									secondary
									icon={<SearchOutlined />}
									titleDrawer={`${vaga.titulo} - ${vaga?.empresa?.nomeFantasia}`}
								>
									<DescricaoVaga
										isEmpresa={isEmpresa}
										user={user}
										vaga={vaga}
										key={vaga?.codVaga}
										fetchCandidaturas={fetchCandidaturas}
									/>
								</ButtonDrawer>
							</span>
						</Tooltip>
					</Row>
				))
			) : (
				<Empty description={t("empty_vacancies")} />
			)}
		</>
	);
};

export default CardVagas;
