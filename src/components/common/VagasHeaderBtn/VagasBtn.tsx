import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VagasBtn = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const onClick_btn = () => {
        navigate("/vagas/")
    }

    return (
        <Button type="primary" onClick={onClick_btn}> {t("vacancy_btn")} </Button>
    );
}

export default VagasBtn;