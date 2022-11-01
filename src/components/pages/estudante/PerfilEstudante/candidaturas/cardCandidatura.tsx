import Button from "@/components/common/Button";
import { getTagColor } from "@/components/common/CarouselVagas/CarouselVagas";
import ImageNotFound from "@/components/common/ImageNotFound";
import { CandidaturaProps } from "@/types/candidaturaType";
import { capitalizaPriLetraDeCadaPalavra, dateTimeMask, realMask } from "@/utils/masks";
import { Col, Row, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./styles.module.css";
import { putCandidatura } from "@/services/candidatura";

export const getStatusColor = (status: string | undefined) => {
	switch (status) {
		case "CANCELADO":
			return "#f0b3b3";
		default:
			return "#aacdee";
	}
};

const CardCandidatura = ({ candidatura, fetchCandidatura }: CandidaturaProps) => {
	const [statusCandidatura, setStatusCandidatura] = useState<string>("Candidatado");

	const { t } = useTranslation();

    const retirarCandidatura = () => {
        const body = { 
            codEstudante: candidatura.codEstudante,
            codVaga: candidatura.codVaga,
            status: "CANCELADO"
        };
        putCandidatura(body).then(() => {
            fetchCandidatura();
        });
    }

	const labelStatusCandidatura = (status: string) => {
		if (status === "CANDIDATADO") {
			return (
				<Button
					className={styles.btnRetiraCandidatura}
					onClick={() => retirarCandidatura()}
					onMouseOver={() => setStatusCandidatura("Retirar Candidatura")}
					onMouseLeave={() => setStatusCandidatura("Candidatado")}
				>
					{capitalizaPriLetraDeCadaPalavra(statusCandidatura)}
				</Button>
			);
		}

		return (
			<span
				className={styles.spanStatus}
				style={{
					backgroundColor: getStatusColor(candidatura?.status),
				}}
				onMouseOver={() => alteraLabelCandidatura("Retirar Candidatura")}
				onMouseLeave={() => alteraLabelCandidatura("Candidatado")}
			>
				{capitalizaPriLetraDeCadaPalavra(status)}
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
					<Link to={`/empresa/profile/${candidatura?.empresa?.codEmpresa}`}>
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
							<Link to={`/empresa/profile/${candidatura?.empresa?.codEmpresa}`}>
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
						<span>Candidatado em: {dateTimeMask(candidatura?.auditoria?.dataInclusao)}</span>
					</div>
				</Col>
				{labelStatusCandidatura(candidatura?.status!)}
			</Row>
		</>
	);
};

export default CardCandidatura;
