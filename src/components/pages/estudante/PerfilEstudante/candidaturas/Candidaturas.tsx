import Button from "@/components/common/Button";
import { getTagColor } from "@/components/common/CarouselVagas/CarouselVagas";
import ImageNotFound from "@/components/common/ImageNotFound";
import Pagination from "@/components/common/Pagination";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import { APROVADO, CANCELADO, statusCandidaturaEnum } from "@/constants/enums";
import { getCandidaturas } from "@/services/candidatura";
import { CandidaturaType, FiltroCandidaturaType } from "@/types/candidaturaType";
import { capitalizaPriLetraDeCadaPalavra, dateTimeMask, realMask } from "@/utils/masks";
import { Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import styles from "./styles.module.css";

export const getStatusColor = (status: string | undefined) => {
	switch (status) {
		case CANCELADO:
			return "#f0b3b3";
		case APROVADO:
			return "#b3f0b3";
		default:
			return "#aacdee";
	}
};

const Candidaturas = ({ user }: PerfilEstudanteProps) => {
	const FILTRO_INICIAL: FiltroCandidaturaType = {
		page: 1,
		size: PAGINATION_SIZE_DEFAULT,
		indAtivo: undefined,
	};

	const [filtro, setFiltro] = useState<FiltroCandidaturaType>(FILTRO_INICIAL);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
	const [candidaturas, setCandidaturas] = useState<CandidaturaType[]>([]);

	const { t } = useTranslation();

	useEffect(() => {
		fetchCandidaturas(filtro?.page);
	}, [filtro?.page]);

	const fetchCandidaturas = async (pagina: number = 1) => {
		if (user.codEstudante) {
			const novoFiltro = { ...filtro, page: pagina };
			const { data, status, headers } = await getCandidaturas(user?.codEstudante, filtro);
			if (status === 200) {
				setCandidaturas(data);
				setFiltro(novoFiltro);
				setQuantidadeTotal(Number(headers["quantidadetotal"]));
			}
		}
	};

	const paginar = (page: number) => {
		setFiltro({ ...filtro, page });
	};

	return (
		<>
			<Row gutter={20} justify="end" style={{ marginBottom: "10px" }}>
				<Col>
					<span
						className={styles.toggleAtivo}
						style={{
							backgroundColor: filtro?.indAtivo ? "var(--secondary-color)" : "#FFF",
							color: filtro?.indAtivo ? "#FFF" : "#000",
						}}
						onClick={() => {
							filtro?.indAtivo
								? setFiltro({ ...filtro, indAtivo: undefined })
								: setFiltro({ ...filtro, indAtivo: true });
						}}
					>
						{t("active")}
					</span>
				</Col>
				<Col>
					<span
						className={styles.toggleAtivo}
						style={{
							backgroundColor: filtro?.indAtivo === false ? "var(--secondary-color)" : "#FFF",
							color: filtro?.indAtivo === false ? "#FFF" : "#000",
						}}
						onClick={() => {
							filtro?.indAtivo === false
								? setFiltro({ ...filtro, indAtivo: undefined })
								: setFiltro({ ...filtro, indAtivo: false });
						}}
					>
						{t("inactive")}
					</span>
				</Col>
				<Col flex={1} md={4}>
					<Button secondary onClick={() => fetchCandidaturas()}>
						{t("search")}
					</Button>
				</Col>
			</Row>
			{candidaturas?.map(candidatura => (
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
							<span>Candidatado em: {dateTimeMask(candidatura?.auditoria?.dataInclusao)}</span>
						</div>
					</Col>
					<span
						className={styles.spanStatus}
						style={{
							backgroundColor: getStatusColor(candidatura?.status),
						}}
					>
						{statusCandidaturaEnum.get(candidatura?.status)}
					</span>
				</Row>
			))}
			<Row justify="end">
				<Pagination
					total={quantidadeTotal}
					pageSize={filtro.size}
					current={filtro.page}
					onChange={paginar}
				/>
			</Row>
		</>
	);
};

export default Candidaturas;
