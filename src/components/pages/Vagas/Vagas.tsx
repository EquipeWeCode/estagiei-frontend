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
import { COLORS } from "@/constants/colors";

const Vagas = () => {
    const FILTRO_INICIAL: VagaType = {
		titulo: "",
		descricao: "",
	};

    const { t } = useTranslation();
    const { TabPane } = Tabs;

    const [vagas, setVagas] = useState<VagaType[]>([]);
    const [filtroVaga, setFiltroVaga] = useState<VagaType>(FILTRO_INICIAL);

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
        <>
            <Row itemType="flex" style={styles} justify="center" className="main-row" align="middle">
                <Col>
                    <h1>{t("vacancy_title_header")}</h1>
                    <p>{t("vacancy_description_header")}</p>
                </Col>
            </Row>
            <Row justify="center" align="middle" style={{ padding: "2rem" }}>
                    <Row justify="center" className="row-vagas" align="middle">
                        <Col>
                            Filtros
                        </Col>
                        <Col>
                                <CardVagas vagas={vagas} competenciasEstudante={[]} />
                        </Col>
                    </Row>
			</Row>
        </>
    )
}

const styles = {
    backgroundColor: `${COLORS.argb.primary_color}`,
    backgroundImage: `url(${executivoBackground})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "calc(350px - 1vw)"
}

export default Vagas;