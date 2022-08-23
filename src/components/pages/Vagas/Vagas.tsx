/// <reference types="vite-plugin-svgr/client" />

import { Row, Col, Space } from "antd";
import { useTranslation } from "react-i18next";

const Vagas = () => {

    const { t } = useTranslation();

    return (
        <>
            <Row itemType="flex" style={style} justify="center" className="main-row">
                <Col>
                    <h1>{t("vacancy_title_header")}</h1>
                    <p>{t("vacancy_description_header")}</p>
                </Col>
            </Row>
        </>
    )
}

const style = {
    alignItems: "center", 
    marginTop: "20px", 
    marginBottom: "20px",
    padding: "10px"
}

export default Vagas;