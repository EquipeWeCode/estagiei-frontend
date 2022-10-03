/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "@/contexts/auth";
import { getVagasRecomendadas } from "@/services/estudante";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as StudentBanner } from "@/assets/fundos/student-banner.svg";
import styles from "./styles.module.css";
import TextBanner from "./TextBanner";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";

const HomePage = (): JSX.Element => {
	const FILTRO_INICIAL: FiltroVagaType = {
		titulo: "",
		descricao: "",
	};

	const { user } = useAuth();
	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [vagasRecomendadas, setVagasRecomendadas] = useState<VagaType[]>([]);
	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);
	const { t } = useTranslation();

	const { TabPane } = Tabs;

	useEffect((): void => {
		if (user?.codEstudante) {
			fetchVagasRecomendadas();
		} else {
			setVagasRecomendadas([]);
		}
	}, [user?.codEstudante]);

	const fetchVagasRecomendadas = async () => {
		const response = await getVagasRecomendadas(user.codEstudante);
		if (response.status === 200) {
			setVagasRecomendadas(response.data);
		}
	};

	return (
		<>
			<Row className={styles.banner}>
				<Row className={styles.bannerContainer} justify="space-around" align="middle">
					<Col className={styles.bannerText}  md={24} xl={12}>
						<TextBanner />
						<div>
							<Button secondary className={styles.bannerButton}>
								<Link to="/cadastro">{t("signup")}</Link>
							</Button>
						</div>
					</Col>
					<Col className={styles.studentImage} span={12}>
						<StudentBanner className={styles.studentSvg} />
					</Col>
					<Col></Col>
				</Row>
			</Row>
			{/* <Row justify="start" style={{ padding: "2rem" }}>
				<Tabs defaultActiveKey="1" style={{ width: "100%" }}>
					<TabPane tab={t("recommended_vacancies")} key="2">
						<Row justify="space-evenly" className="row-vagas">
							<CardVagas
								vagas={vagasRecomendadas}
								competenciasEstudante={user.competencias || []}
							/>
						</Row>
					</TabPane>
				</Tabs>
			</Row> */}
		</>
	);
};

export default HomePage;
