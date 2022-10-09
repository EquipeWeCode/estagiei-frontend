import DescricaoVaga from "@/components/pages/DescricaoVaga";
import { useAuth } from "@/contexts/auth";
import { CompetenciaType } from "@/types/competenciaType";
import { VagaType } from "@/types/vagasTypes";
import {
	capitalizaPriLetraDeCadaPalavra,
	ellipsisText,
	justDateMask,
	realMask,
} from "@/utils/masks";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Col, Empty, Row, Tag } from "antd";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ButtonDrawer from "../ButtonDrawer";
import { getTagColor } from "../CarouselVagas/CarouselVagas";
import ImageNotFound from "../ImageNotFound";
import styles from "./styles.module.css";

interface CardVagasProps {
	vagas: VagaType[];
	competenciasEstudante: CompetenciaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const { user } = useAuth();
	const { t } = useTranslation();

	const { vagas = [], competenciasEstudante = [] } = props;

	const refDrawer = useRef<ButtonDrawer>(null);

	const fechaDrawer = () => {
		refDrawer?.current?.fechaDrawer();
	};

	useEffect(() => {
		fechaDrawer();
	}, []);

	return (
		<>
			{vagas && vagas?.length > 0 ? (
				vagas?.map((vaga: VagaType) => (
					<Row key={vaga.codVaga} className={styles.containerVaga} align="middle">
						<Col className={styles.colImage}>
							<Link to={`/empresa/profile/${vaga?.empresa?.codEmpresa}`}>
								{vaga?.empresa?.avatar ? (
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
								)}
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
									<Link to={`/empresa/profile/${vaga?.empresa?.codEmpresa}`}>
										{vaga.empresa && capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
									</Link>
								</div>
							</div>
							<p className={styles.colDesc}>{ellipsisText(vaga.descricao, 75)}</p>
							<div>
								<p style={{ fontSize: "1.4rem", display: "inline-block" }}>
									{vaga?.salario ? realMask(vaga?.salario) : t("not_informed")}
								</p>
							</div>
							<div className={styles.locationAuditoria}>
								<span>
									<EnvironmentOutlined /> {vaga?.endereco?.cidade} / {vaga?.endereco?.estado}
								</span>
								<span>
									<ClockCircleOutlined /> {justDateMask(vaga?.auditoria?.dataInclusao)}
								</span>
							</div>
						</Col>
						<ButtonDrawer
							secondary
							ref={refDrawer}
							label={t("show_details")}
							title={`${vaga.titulo} - ${vaga?.empresa?.nomeFantasia}`}
						>
							<DescricaoVaga refDrawer={refDrawer} user={user} vaga={vaga} key={vaga?.codVaga} />
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
