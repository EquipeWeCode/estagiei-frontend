/// <reference types="vite-plugin-svgr/client" />

import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";

const Vagas = () => {

    const { t } = useTranslation();

    return (
        <>
            <Row>
                <Col>
                    <h1>{t("vacancy_title_header")}</h1>
                    <p>{t("vacancy_description_header")}</p>
                </Col>
            </Row>
        </>
    )
}