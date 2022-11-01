import Button from "@/components/common/Button";
import { CandidaturaType, FiltroCandidaturaType } from "@/types/candidaturaType";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { getCandidaturas } from "@/services/candidatura";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import Pagination from "@/components/common/Pagination";
import CardCandidatura from "./cardCandidatura";

export const getStatusColor = (status: string | undefined) => {
	switch (status) {
		case "CANCELADO":
			return "#f0b3b3";
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
			<Row gutter={20} justify="end" style={{ marginBottom: "10px"}}>
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
				<CardCandidatura candidatura={candidatura} fetchCandidatura={fetchCandidaturas}/>
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