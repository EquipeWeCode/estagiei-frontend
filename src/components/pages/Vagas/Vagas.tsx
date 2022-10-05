/// <reference types="vite-plugin-svgr/client" />

import { Row, Col, Button, Tabs } from "antd";
import Input from "@/components/common/Input";
import CardVagas from "@/components/common/CardVagas";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { getVagas } from "@/services/vaga";
import { useAuth } from "@/contexts/auth";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import executivoBackground from "@/assets/fundos/executivo.jpg";
import styles from "./styles.module.css";

const Vagas = () => {
	const FILTRO_INICIAL: FiltroVagaType = {
		titulo: "",
		descricao: "",
	};

	const { t } = useTranslation();
	const { TabPane } = Tabs;

	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);

	useEffect((): void => {
		fetchVagas();
	}, []);

	const fetchVagas = async () => {
		const response = await getVagas(filtroVaga);
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	return (
		<div className="container">
			<Row
				itemType="flex"
				style={styles}
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
									<Col flex={1}>
										<Input
											allowClear={true}
											placeholder={t("type_job_title")}
											value={filtroVaga.titulo}
											onChange={v => setFiltroVaga({ ...filtroVaga, titulo: v.target.value })}
										/>
									</Col>
									<Col flex={1}>
										<Input
											allowClear={true}
											placeholder={t("type_job_description")}
											value={filtroVaga.descricao}
											onChange={v => setFiltroVaga({ ...filtroVaga, descricao: v.target.value })}
										/>
									</Col>
									<Col flex={1}>
										<Button type="primary" onClick={fetchVagas}>
											{t("search")}
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</TabPane>
				</Tabs>
				<Row justify="center" className={styles.rowVagas} align="middle">
					<Col>
						<CardVagas vagas={vagas} competenciasEstudante={[]} />
					</Col>
				</Row>
			</Row>
		</div>
	);
};

// const styles = {
//     backgroundImage: `linear-gradient(rgba(191, 66, 245, 0.6), rgba(255, 255, 255, 0.3)), url(${executivoBackground})`,
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     height: "calc(350px - 1vw)"
// }

export default Vagas;
