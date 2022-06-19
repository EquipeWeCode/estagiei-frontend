import CardVagas from "@/components/common/CardVagas";
import { useAuth } from "@/contexts/auth";
import { getVagasRecomendadas } from "@/services/estudante";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Button, Col, Divider, Input, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InfoUsuario from "./InfoUsuario";

const HomePage = (): JSX.Element => {
	const FILTRO_INICIAL: FiltroVagaType = {
		titulo: "",
		descricao: "",
	};

	const { user, signed } = useAuth();
	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [vagasRecomendadas, setVagasRecomendadas] = useState<VagaType[]>([]);
	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);
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
		const response = await getVagas(filtroVaga);
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
				<InfoUsuario user={user} />
			</Row>
			<Divider />

			<Row justify="start" style={{ padding: "2rem" }}>
				<Tabs defaultActiveKey="1" style={{ width: "100%" }}>
					<TabPane tab={t("vacancies")} key="1">
						<Row justify="space-evenly" className="row-vagas">
							<Col md={24}>
								<Row style={{ marginBottom: "1rem" }} gutter={12} justify="center" align="bottom">
									<Col md={6}>
										<Input
											style={{ borderRadius: "0.5rem" }}
											allowClear={true}
											placeholder={t("type_job_title")}
											value={filtroVaga.titulo}
											onChange={v => setFiltroVaga({ ...filtroVaga, titulo: v.target.value })}
										/>
									</Col>
									<Col md={6}>
										<Input
											style={{ borderRadius: "0.5rem" }}
											allowClear={true}
											placeholder={t("type_job_description")}
											value={filtroVaga.descricao}
											onChange={v => setFiltroVaga({ ...filtroVaga, descricao: v.target.value })}
										/>
									</Col>
									<Col md={6}>
										<Button type="primary" onClick={fetchVagas} style={{ borderRadius: "0.5rem" }}>
											{t("search")}
										</Button>
									</Col>
								</Row>
							</Col>
							<CardVagas vagas={vagas} competenciasEstudante={user.competencias || []} />
						</Row>
					</TabPane>
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
