/// <reference types="vite-plugin-svgr/client" />

import Button from "@/components/common/Button";
import CardVagas from "@/components/common/CardVagas";
import Input from "@/components/common/Input";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row, Tabs } from "antd";
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
	};

	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);

	useEffect((): void => {
		fetchVagas();
	}, []);

	const fetchVagas = async () => {
		setSearchParams({
			titulo: filtroVaga.titulo || "",
			descricao: filtroVaga.descricao || "",
		});

		const response = await getVagas(filtroVaga);
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	const changeFiltroVaga = (e: any) => {
		const { name, value } = e.target;
		setFiltroVaga({ ...filtroVaga, [name]: value });
	};

	return (
		<div className="container">
			<Row
				itemType="flex"
				style={stylesNovo}
				justify="center"
				className={styles.mainRow}
				align="middle"
			>
				<Col>
					<h1>{t("vacancy_title_header")}</h1>
					<p>{t("vacancy_description_header")}</p>
				</Col>
			</Row>

			<Row justify="center" align="middle" style={{ padding: "2rem" }}>
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
										<Button type="primary" onClick={fetchVagas}>
											{t("search")}
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row justify="center" className={styles.rowVagas} align="middle">
							<Col>
								<CardVagas vagas={vagas} competenciasEstudante={[]} />
							</Col>
						</Row>
					</TabPane>
				</Tabs>
			</Row>
		</div>
	);
};

const stylesNovo = {
	backgroundImage: `linear-gradient(rgba(191, 66, 245, 0.6), rgba(255, 255, 255, 0.3))`,
	backgroundPosition: "center",
	backgroundSize: "cover",
	width: "100%",
	marginTop: "-1rem",
	backgroundRepeat: "no-repeat",
	height: "calc(350px - 1vw)",
};

export default Vagas;
