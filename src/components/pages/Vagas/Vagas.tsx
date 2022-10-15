/// <reference types="vite-plugin-svgr/client" />

import Button from "@/components/common/Button";
import CardVagas from "@/components/common/CardVagas";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { ESTUDANTE, PAGINATION_SIZE_DEFAULT } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { getCandidaturas } from "@/services/candidatura";
import { getVagas } from "@/services/vaga";
import { CandidaturaType } from "@/types/candidaturaType";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";

const Vagas = () => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const { TabPane } = Tabs;
	const roles = user?.roles;
	const isEstudante = roles?.includes(ESTUDANTE);

	const [searchParams, setSearchParams] = useSearchParams();

	const titulo = searchParams.get("titulo");
	const descricao = searchParams.get("descricao");

	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [candidaturas, setCandidaturas] = useState<CandidaturaType[]>([]);

	const FILTRO_INICIAL: FiltroVagaType = {
		titulo: titulo || "",
		descricao: descricao || "",
		page: 1,
		size: PAGINATION_SIZE_DEFAULT,
	};

	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

	useEffect((): void => {
		fetchVagas(filtroVaga?.page);
	}, [filtroVaga?.page]);

	useEffect((): void => {
		if (user?.codEstudante) {
			fetchCandidaturas();
		}
	}, [user?.codEstudante]);

	const fetchCandidaturas = async () => {
		if (isEstudante) {
			const { data, status } = await getCandidaturas(user?.codEstudante);
			if (status === 200) {
				setCandidaturas(data);
				fetchVagas(filtroVaga?.page);
			}
		}
	};

	const fetchVagas = async (pagina: number = 1) => {
		setSearchParams({
			titulo: filtroVaga.titulo || "",
			descricao: filtroVaga.descricao || "",
		});

		const novoFiltro = { ...filtroVaga, page: pagina };

		const response = await getVagas(novoFiltro);

		if (response.status === 200) {
			setVagas(response.data);
			setFiltroVaga(novoFiltro);
			setQuantidadeTotal(Number(response?.headers["quantidadetotal"]));
		}
	};

	const changeFiltroVaga = (e: any) => {
		const { name, value } = e.target;
		setFiltroVaga({ ...filtroVaga, [name]: value });
	};

	const paginar = (page: number) => {
		setFiltroVaga({ ...filtroVaga, page });
	};

	return (
		<div className="container">
			<Row itemType="flex" justify="center" className={styles.mainRow} align="middle">
				<Col sm={24}>
					<h1>{t("vacancy_title_header")}</h1>
				</Col>
				<Col sm={24}>
					<p>{t("vacancy_description_header")}</p>
				</Col>
			</Row>

			<Row justify="center" align="middle">
				<Tabs defaultActiveKey="1" style={{ width: "100%" }}>
					<TabPane tab={t("vacancies")} key="1">
						<Row justify="center" align="middle" className={styles.searchRow}>
							<Col className={styles.searchCol}>
								<Row style={{ marginBottom: "1rem" }} gutter={12} className={styles.searchSecRow}>
									<Col flex={1} md={10}>
										<Input
											allowClear={true}
											placeholder={t("type_job_title")}
											value={filtroVaga.titulo}
											onChange={changeFiltroVaga}
											name="titulo"
										/>
									</Col>
									<Col flex={1} md={10}>
										<Input
											allowClear={true}
											placeholder={t("type_job_description")}
											value={filtroVaga.descricao}
											onChange={changeFiltroVaga}
											name="descricao"
										/>
									</Col>
									<Col flex={1} md={4}>
										<Button secondary onClick={() => fetchVagas()}>
											{t("search")}
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row justify="end" style={{ marginBottom: "1rem" }}>
							<Pagination
								total={quantidadeTotal}
								pageSize={filtroVaga.size}
								current={filtroVaga.page}
								onChange={paginar}
							/>
						</Row>
						<CardVagas vagas={vagas} candidaturas={candidaturas} fetchCandidaturas={fetchCandidaturas} />
						<Row justify="end">
							<Pagination
								total={quantidadeTotal}
								pageSize={filtroVaga.size}
								current={filtroVaga.page}
								onChange={paginar}
							/>
						</Row>
					</TabPane>
				</Tabs>
			</Row>
		</div>
	);
};

export default Vagas;
