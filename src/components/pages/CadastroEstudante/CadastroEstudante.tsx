import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, postEstudante, putEstudante } from "@/services/estudante";
import { CadastroEstudanteType, UserType } from "@/types/userTypes";
import { CompetenciaType } from "@/types/competenciaType";
import { getCompetencias } from "@/services/competencias";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { getToken } from "@/services/autenticacao";

import CadastroEstudanteInicio from "./CadastroEstudanteInicio";
import TerminoCadastro from "./TerminoCadastro";
import { useSelector, useDispatch } from "react-redux";

//fluxo -> na hora que ele terminar a etp1, eu coloco como true no redux e isso passa para o
//proximo componente

//cadastroetp1 
//cadastroetp2

const CadastroEstudante = () => {
	const [token, setToken] = useState(getToken());
	const navigate = useNavigate();
	const cadastroetp1 = useSelector((state) => state.cadastroetp1.value);

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	})

	return (

	);
};

export default CadastroEstudante;
