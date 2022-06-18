import CardVagas from "@/components/common/CardVagas";
import { useAuth } from "@/contexts/auth";
import { getVagasRecomendadas } from "@/services/estudante";
import { getVagas } from "@/services/vaga";
import { VagaType } from "@/types/vagasTypes";
import { Col, Divider, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InfoUsuario from "./InfoUsuario";

const HomePage = (): JSX.Element => {
	const { user, signed } = useAuth();
	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [vagasRecomendadas, setVagasRecomendadas] = useState<VagaType[]>([]);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { TabPane } = Tabs;

	useEffect((): void => {
		if (!signed || !user) {
			navigate("/login");
		} else {
			fetchVagas();
			fetchVagasRecomendadas();
		}
	}, [signed]); // TODO: melhorar isso depois

	const fetchVagas = async () => {
		const response = await getVagas({});
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	const fetchVagasRecomendadas = async () => {
		const response = await getVagasRecomendadas(user.codEstudante);
		if (response.status === 200) {
			setVagasRecomendadas(response.data);
		}
	};

	return (
		<>
			<Row justify="center" style={{ padding: "2rem" }}>
				<Col className="container-info-user" span={12}>
					<InfoUsuario user={user} />
				</Col>
			</Row>
			<Divider />

			<Row justify="center" style={{ padding: "2rem" }}>
				<Tabs defaultActiveKey="1">
					<TabPane tab={t("vacancies")} key="1">
						<Row justify="center">
							<h2>{t("vacancies")}</h2>
						</Row>
						<Row justify="space-evenly" className="row-vagas">
							<CardVagas vagas={vagas} competenciasEstudante={user.competencias || []} />
						</Row>
					</TabPane>
					<TabPane tab={t("recommended_vacancies")} key="2">
						<Row justify="center">
							<h2>{t("recommended_vacancies")}</h2>
						</Row>
						<Row justify="space-evenly" className="row-vagas">
							<CardVagas
								vagas={vagasRecomendadas}
								competenciasEstudante={user.competencias || []}
							/>
						</Row>
					</TabPane>
				</Tabs>
			</Row>
		</>
	);
};

export default HomePage;
