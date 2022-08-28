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

const Vagas = () => {
    const FILTRO_INICIAL: FiltroVagaType = {
		titulo: "",
		descricao: "",
	};

    const { t } = useTranslation();
    const { TabPane } = Tabs;

    const { user, signed } = useAuth();
    const [vagas, setVagas] = useState<VagaType[]>([]);
    const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);

    useEffect((): void => {
		// if (!signed || !user) {
		// 	navigate("/login");
		// } else {
			fetchVagas();
		// }
	}, [signed]); // TODO: melhorar isso depois

	const fetchVagas = async () => {
		const response = await getVagas(filtroVaga);
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

    return (
        <>
            <Row itemType="flex" style={styles} justify="center" className="main-row" align="middle">
                <Col>
                    <h1>{t("vacancy_title_header")}</h1>
                    <p>{t("vacancy_description_header")}</p>
                </Col>
            </Row>
            <Row justify="start" style={{ padding: "2rem" }}>
				<Tabs defaultActiveKey="1" style={{ width: "100%" }}>
						<Row justify="space-evenly" className="row-vagas">
							<Col md={24}>
								<Row style={{ marginBottom: "1rem" }} gutter={12} justify="center" align="bottom">
									{/* <Col md={6}>
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
										<Button type="primary" onClick={fetchVagas}>
											{t("search")}
										</Button>
									</Col> */}
                                    <CardVagas vagas={vagas} competenciasEstudante={user.competencias || []} />
								</Row>
							</Col>
						</Row>
				</Tabs>
			</Row>
        </>
    )
}

const styles = {
    backgroundImage: `url(${executivoBackground})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "500px"
}

export default Vagas;