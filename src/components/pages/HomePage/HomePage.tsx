/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "@/contexts/auth";
import { getVagasRecomendadas } from "@/services/estudante";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BannerStudent from "@/assets/fundos/student-banner.png";
import { ReactComponent as StudentBanner } from "@/assets/fundos/student-banner.svg";

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
			<Row className="banner" justify="center" align="middle" style={{ height: "100vh" }}>
				<Col span={12}></Col>
				<Col span={12}>
					<StudentBanner  width={500}/>
				</Col>
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
