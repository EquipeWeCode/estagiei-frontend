import Button from "@/components/common/Button";
import { getTagColor } from "@/components/common/CarouselVagas/CarouselVagas";
import ImageNotFound from "@/components/common/ImageNotFound";
import {
	APROVADO,
	CANCELADO,
	CANCELADO_ESTUDANTE,
	CANDIDATADO,
	FINALIZADO,
	REPROVADO,
	statusCandidaturaEnum,
} from "@/constants/enums";
import { putCandidatura } from "@/services/candidatura";
import { CandidaturaProps } from "@/types/candidaturaType";
import { capitalizaPriLetraDeCadaPalavra, dateTimeMask, realMask } from "@/utils/masks";
import { Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export const getStatusColor = (status: string | undefined) => {
	switch (status) {
		case CANCELADO:
			return "#e69292";
		case REPROVADO:
			return "#cdb6e0";
		case CANCELADO_ESTUDANTE:
			return "#f0b3b3";
		case APROVADO:
			return "#b3f0b3";
		case FINALIZADO:
			return "#b3b3f0";
		default:
			return "#aacdee";
	}
};

const CardCandidatura = ({ candidatura, status, fetchCandidatura }: CandidaturaProps) => {
	const [statusCandidatura, setStatusCandidatura] = useState<string>(
		statusCandidaturaEnum.get(candidatura?.status) || ""
	);

	useEffect(() => {
		setStatusCandidatura(capitalizaPriLetraDeCadaPalavra(statusCandidaturaEnum.get(status)));
	}, [status]);

	const { t } = useTranslation();

	const retirarCandidatura = () => {
		const body = {
			codEstudante: candidatura.codEstudante,
			codVaga: candidatura.codVaga,
			status: CANCELADO_ESTUDANTE,
		};
		putCandidatura(body).then(() => {
			fetchCandidatura();
		});
	};

	const labelStatusCandidatura = () => {
		const labelStatus = capitalizaPriLetraDeCadaPalavra(statusCandidaturaEnum.get(status));
		if (candidatura.status === CANDIDATADO) {
			return (
				<Button
					className={styles.btnRetiraCandidatura}
					onClick={() => retirarCandidatura()}
					onMouseOver={() => setStatusCandidatura(t("cancel_application"))}
					onMouseLeave={() => setStatusCandidatura(statusCandidaturaEnum.get(CANDIDATADO))}
				>
					{statusCandidatura}
				</Button>
			);
		}

		return (
			<span
				className={styles.spanStatus}
				style={{
					backgroundColor: getStatusColor(candidatura?.status),
				}}
				onMouseOver={() => alteraLabelCandidatura(t("cancel_application"))}
				onMouseLeave={() => alteraLabelCandidatura("Candidatado")}
			>
				{labelStatus}
			</span>
		);
	};

	const alteraLabelCandidatura = (status: string) => {
		setStatusCandidatura(status);
	};

	return (
		<>
			<Row key={candidatura.codVaga} className={styles.containerVaga} align="middle">
				<Col className={styles.colImage}>
					<Link to={`/empresa/perfil/${candidatura?.empresa?.codEmpresa}`}>
						{candidatura?.empresa?.avatar ? (
							<>
								<img
									src={candidatura?.empresa?.avatar}
									alt="avatar-company"
									className={styles.companyImage}
									width={100}
									height={100}
								/>
							</>
						) : (
							<ImageNotFound width={100} height={100} className={styles.companyImage} />
						)}
					</Link>
				</Col>
				<Col className={styles.content}>
					<div className={styles.vagaTituloContainer}>
						<div className={styles.vagaTitulo}>
							<h3>{candidatura.titulo}</h3>
							<span>
								<Tag className={styles.tagModalidade} color={getTagColor(candidatura.modalidade)}>
									{candidatura.modalidade}
								</Tag>
							</span>
						</div>
						<div style={{ color: "var(--primary-color)" }}>
							<Link to={`/empresa/perfil/${candidatura?.empresa?.codEmpresa}`}>
								{candidatura.empresa &&
									capitalizaPriLetraDeCadaPalavra(candidatura.empresa.nomeFantasia)}
							</Link>
						</div>
					</div>
					<div>
						<p style={{ fontSize: "1rem", display: "inline-block" }}>
							{candidatura?.salario ? realMask(candidatura?.salario) : t("not_informed")}
						</p>
					</div>
					<div className={styles.locationAuditoria}>
						<div>
							{t("applied_on")}: {dateTimeMask(candidatura?.auditoria?.dataInclusao)}
						</div>
						{candidatura?.auditoria?.dataAlteracao && (
							<span>
								{t("last_modified")}: {dateTimeMask(candidatura?.auditoria?.dataAlteracao)}
							</span>
						)}
					</div>
				</Col>
				{labelStatusCandidatura()}
			</Row>
		</>
	);
};

export default CardCandidatura;
