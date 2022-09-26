import Button from "@/components/common/Button";
import CardVagas from "@/components/common/CardVagas";
import Input from "@/components/common/Input";
import { useAuth } from "@/contexts/auth";
import { getToken } from "@/services/autenticacao";
import { getVagasRecomendadas } from "@/services/estudante";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Divider, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InfoUsuario from "./InfoUsuario";

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
			{/* <Row justify="center" style={{ padding: "2rem" }}>
				<InfoUsuario user={user} />
			</Row>
			<Divider /> */}

			<Row justify="start" style={{ padding: "2rem" }}>
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
			</Row>
		</>
	);
};

export default HomePage;
