/// <reference types="vite-plugin-svgr/client" />

import { Row, Col, Space } from "antd";
import { useTranslation } from "react-i18next";
import executivoBackground from "@/assets/fundos/executivo.jpg";

const Vagas = () => {

    const { t } = useTranslation();

    return (
        <>
            <Row itemType="flex" style={styles} justify="center" className="main-row" align="middle">
                <Col>
                    <h1>{t("vacancy_title_header")}</h1>
                    <p>{t("vacancy_description_header")}</p>
                </Col>
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