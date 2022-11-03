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
import { useAppSelector, useAppDispatch } from "@/redux/reducers/hooks";
import { negateCadastroetp1, negateCadastroetp2 } from "@/redux/reducers/cadastro";

const CadastroEstudante = () => {
	const [token, setToken] = useState(getToken());
	const navigate = useNavigate();

	const cadastroetp1 = useAppSelector(state => state.cadastro.cadastroetp1);
	const cadastroetp2 = useAppSelector(state => state.cadastro.cadastroetp2);
	const estudante = useAppSelector(state => state.cadastro.estudante);

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	})

	const salvaEstudante = async () => {
		console.log(estudante);
		
		try {
			const response = await postEstudante(estudante);
			navigate("/");
		}
		catch (e) {
			console.log(e);
			navigate("/");
		}
	};

	const Cadastro = () => {
		if (!cadastroetp1) {
			return <CadastroEstudanteInicio />
		}
		if (!cadastroetp2) {
			return <TerminoCadastro />
		}

		salvaEstudante();
		navigate('/')
	}

	return (Cadastro());
};

export default CadastroEstudante;
