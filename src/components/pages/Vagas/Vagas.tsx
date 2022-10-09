/// <reference types="vite-plugin-svgr/client" />

import Button from "@/components/common/Button";
import CardVagas from "@/components/common/CardVagas";
import Input from "@/components/common/Input";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Pagination, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";

const Vagas = () => {
	const { t } = useTranslation();
	const { TabPane } = Tabs;

	const [searchParams, setSearchParams] = useSearchParams();

	const titulo = searchParams.get("titulo");
	const descricao = searchParams.get("descricao");

	const [vagas, setVagas] = useState<VagaType[]>([]);

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
								defaultCurrent={1}
								total={quantidadeTotal}
								pageSize={filtroVaga.size}
								current={filtroVaga.page}
								onChange={paginar}
							/>
						</Row>
						<CardVagas vagas={vagas} competenciasEstudante={[]} />
						<Row justify="end">
							<Pagination
								defaultCurrent={1}
								total={quantidadeTotal}
								pageSize={filtroVaga.size}
								current={filtroVaga.page}
								onChange={paginar}
							/>
						</Row>
						{/* </Col> */}
						{/* </Row> */}
					</TabPane>
				</Tabs>
			</Row>
		</div>
	);
};

export default Vagas;
