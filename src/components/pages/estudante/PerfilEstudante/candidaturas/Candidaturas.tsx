import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";
import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import { statusCandidaturaEnum } from "@/constants/enums";
import { getCandidaturas } from "@/services/candidatura";
import { CandidaturaType, FiltroCandidaturaType } from "@/types/candidaturaType";
import { getEnumConstant } from "@/utils/selects";
import { Col, Empty, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import CardCandidatura from "./cardCandidatura";

const Candidaturas = ({ user }: PerfilEstudanteProps) => {
	const FILTRO_INICIAL: FiltroCandidaturaType = {
		page: 1,
		size: PAGINATION_SIZE_DEFAULT,
		status: undefined,
	};

	const optionsStatus = getEnumConstant(statusCandidaturaEnum);

	const [filtro, setFiltro] = useState<FiltroCandidaturaType>(FILTRO_INICIAL);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);
	const [candidaturas, setCandidaturas] = useState<CandidaturaType[]>([]);

	const { t } = useTranslation();

	useEffect(() => {
		fetchCandidaturas(filtro?.page);
	}, [filtro?.page]);

	const fetchCandidaturas = async (pagina: number = 1) => {
		if (user.codEstudante) {
			const novoFiltro = { ...filtro, page: pagina };
			const { data, status, headers } = await getCandidaturas(user?.codEstudante, filtro);
			if (status === 200) {
				setCandidaturas(data);
				setFiltro(novoFiltro);
				setQuantidadeTotal(Number(headers["quantidadetotal"]));
			}
		}
	};

	const paginar = (page: number) => {
		setFiltro({ ...filtro, page });
	};

	return (
		<>
			<Row gutter={20} justify="end" style={{ marginBottom: "10px" }}>
				<Col>
					<Select
						allowClear={true}
						placeholder={t("select_status")}
						style={{ width: 200 }}
						onChange={value => setFiltro({ ...filtro, status: value })}
						value={filtro?.status}
					>
						{optionsStatus.map(option => (
							<Select.Option key={option.value} value={option.value}>
								{option.label}
							</Select.Option>
						))}
					</Select>
				</Col>
				<Col flex={1} md={4}>
					<Button secondary onClick={() => fetchCandidaturas()}>
						{t("search")}
					</Button>
				</Col>
			</Row>
			{candidaturas?.length > 0 ? (
				candidaturas?.map((candidatura, idx) => (
					<CardCandidatura
						key={idx}
						candidatura={candidatura}
						status={candidatura.status}
						fetchCandidatura={fetchCandidaturas}
					/>
				))
			) : (
				<Empty description={t("no_data")} />
			)}
			<Row justify="end">
				<Pagination
					total={quantidadeTotal}
					pageSize={filtro.size}
					current={filtro.page}
					onChange={paginar}
				/>
			</Row>
		</>
	);
};

export default Candidaturas;
