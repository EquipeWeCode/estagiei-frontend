import Button from "@/components/common/Button";
import CardVagas from "@/components/common/CardVagas";
import Input from "@/components/common/Input";
import Pagination from "@/components/common/Pagination";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import { getVagas } from "@/services/vaga";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PerfilEmpresaProps } from "../PerfilEmpresa";
import styles from "./styles.module.css";

const MinhasVagas = ({ user }: PerfilEmpresaProps) => {
	const [vagas, setVagas] = useState<VagaType[]>([]);

	const FILTRO_INICIAL: FiltroVagaType = {
		codEmpresa: user?.codEmpresa,
		size: PAGINATION_SIZE_DEFAULT,
	};

	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
	const { t } = useTranslation();

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

	const changeFiltroVaga = (e: any) => {
		const { name, value } = e.target;
		setFiltroVaga({ ...filtroVaga, [name]: value });
	};

	return (
		<>
			<Row justify="center" align="middle" className={styles.searchRow}>
				<Col className={styles.searchCol}>
					<Row style={{ marginBottom: "1rem" }} gutter={12} className={styles.searchSecRow}>
						<Col flex={1} md={8}>
							<Input
								allowClear={true}
								placeholder={t("type_job_title")}
								value={filtroVaga.titulo}
								onChange={changeFiltroVaga}
								name="titulo"
							/>
						</Col>
						<Col flex={1} md={8}>
							<Input
								allowClear={true}
								placeholder={t("type_job_description")}
								value={filtroVaga.descricao}
								onChange={changeFiltroVaga}
								name="descricao"
							/>
						</Col>
						<Col flex={1} md={4}>
							<Button secondary onClick={() => fetchVagas()}>
								{t("search")}
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
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
