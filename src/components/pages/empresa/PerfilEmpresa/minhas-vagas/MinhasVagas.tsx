import CardVagas from "@/components/common/CardVagas";
import Pagination from "@/components/common/Pagination";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Row } from "antd";
import { useEffect, useState } from "react";
import { PerfilEmpresaProps } from "../PerfilEmpresa";

const MinhasVagas = ({ user }: PerfilEmpresaProps) => {
	const [vagas, setVagas] = useState<VagaType[]>([]);

	const FILTRO_INICIAL: FiltroVagaType = {
		codEmpresa: user?.codEmpresa,
		size: PAGINATION_SIZE_DEFAULT,
	};

	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

	useEffect((): void => {
		fetchVagas(filtroVaga?.page);
	}, [filtroVaga?.page]);

	const fetchVagas = async (pagina: number = 1) => {
		const novoFiltro = { ...filtroVaga, page: pagina };
		const response = await getVagas(novoFiltro);

		if (response.status === 200) {
			setVagas(response.data);
			setFiltroVaga(novoFiltro);
			setQuantidadeTotal(Number(response?.headers["quantidadetotal"]));
		}
	};

	const paginar = (page: number) => {
		setFiltroVaga({ ...filtroVaga, page });
	};

	return (
		<>
			<Row justify="end" style={{ marginBottom: "1rem" }}>
				<Pagination
					total={quantidadeTotal}
					pageSize={filtroVaga.size}
					current={filtroVaga.page}
					onChange={paginar}
				/>
			</Row>
			<CardVagas vagas={vagas} isEmpresa={true} />
			<Row justify="end">
				<Pagination
					total={quantidadeTotal}
					pageSize={filtroVaga.size}
					current={filtroVaga.page}
					onChange={paginar}
				/>
			</Row>
		</>
	);
};

export default MinhasVagas;
