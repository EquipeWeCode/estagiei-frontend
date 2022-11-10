import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "@/services/autenticacao";
import CadastroEstudanteInicio from "./CadastroEstudanteInicio";
import TerminoCadastro from "./TerminoCadastro";
import { useAppSelector } from "@/redux/reducers/hooks";

const CadastroEstudante = () => {
	const [token, setToken] = useState(getToken());
	const navigate = useNavigate();

	const cadastroetp1 = useAppSelector(state => state.cadastro.cadastroetp1);

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	})

	const Cadastro = () => {
		if (!cadastroetp1) {
			return <CadastroEstudanteInicio />
		}

		return <TerminoCadastro />
	}

	return (
		Cadastro()
	);
};

export default CadastroEstudante;
