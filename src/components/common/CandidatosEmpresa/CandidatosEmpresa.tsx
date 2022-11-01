import { PAGINATION_SIZE_DEFAULT } from "@/constants";
import {
	APROVADO,
	CANCELADO,
	CANDIDATADO,
	FINALIZADO,
	REPROVADO,
	statusCandidaturaEnum,
} from "@/constants/enums";
import { getCandidaturas, putCandidatura } from "@/services/candidatura";
import { getEstudante } from "@/services/estudante";
import { CandidaturaType, FiltroCandidaturaType } from "@/types/candidaturaType";
import { ContatoType } from "@/types/userTypes";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { getEnumConstant } from "@/utils/selects";
import {
	CaretRightOutlined,
	CheckOutlined,
	CheckSquareOutlined,
	CloseOutlined,
	MailOutlined,
	WhatsAppOutlined,
} from "@ant-design/icons";
import { Col, Empty, Row, Select, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../Button";
import Pagination from "../Pagination";
import styles from "./styles.module.css";

type CandidatosEmpresaProps = {
	codEmpresa?: number | string;
	codVaga?: number | string;
};

const CandidatosEmpresa = (props: CandidatosEmpresaProps) => {
	const { t } = useTranslation();
	const { codEmpresa, codVaga } = props;
	const [candidaturas, setCandidaturas] = useState<CandidaturaType[]>([]);
	const [quantidadeTotal, setQuantidadeTotal] = useState<number>(0);

	const FILTRO_INICIAL: FiltroCandidaturaType = {
		codEmpresa,
		codVaga,
		size: PAGINATION_SIZE_DEFAULT,
		// indAtivo: true,
	};

	const statusModificaveis = [CANDIDATADO];

	const [filtroCandidatura, setFiltroCandidatura] = useState<FiltroCandidaturaType>(FILTRO_INICIAL);

	useEffect((): void => {
		fetchCandidaturas(filtroCandidatura?.page);
	}, [filtroCandidatura?.page]);

	const fetchCandidaturas = async (pagina: number = 1) => {
		const novoFiltro = { ...filtroCandidatura, page: pagina };
		const response = await getCandidaturas(undefined, novoFiltro);

		if (response.status === 200) {
			setCandidaturas(response.data);
			setFiltroCandidatura(novoFiltro);
			setQuantidadeTotal(Number(response?.headers["quantidadetotal"]));
		}
	};

	const paginar = (page: number) => {
		setFiltroCandidatura({ ...filtroCandidatura, page });
	};

	const getTagColor = (status: string | undefined) => {
		switch (status) {
			case CANCELADO:
				return "error";
			case REPROVADO:
				return "error";
			case APROVADO:
				return "success";
			default:
				return "purple";
		}
	};

	const mudarCandidatura = async (
		codEstudante: number | string | undefined,
		status: string | undefined
	) => {
		const body = {
			codVaga,
			codEstudante,
			status,
		};
		await putCandidatura(body);
		fetchCandidaturas(filtroCandidatura?.page);
	};

	const entrarEmContato = async (codEstudante: number | string | undefined) => {
		const { data } = await getEstudante(codEstudante);
		const { contatos } = data;
		const contatoCelular = contatos.find(
			(contato: ContatoType) => contato.tipoContato === "CELULAR"
		);

		if (contatoCelular?.valorContato) {
			window.open(`https://api.whatsapp.com/send?phone=55${contatoCelular.valorContato}`, "_blank");
		}
	};

	const entrarEmContatoEmail = async (codEstudante: number | string | undefined) => {
		const { data } = await getEstudante(codEstudante);
		const { email } = data;

		if (email) {
			window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}`, "_blank");
		}
	};

	const optionsStatus = getEnumConstant(statusCandidaturaEnum);

	return (
		<>
			<>
				<Row gutter={20} justify="end" style={{ marginBottom: "10px" }}>
					<Col>
						<Select
							allowClear={true}
							placeholder={t("select_status")}
							style={{ width: 200 }}
							onChange={value => setFiltroCandidatura({ ...filtroCandidatura, status: value })}
							value={filtroCandidatura?.status}
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
				<Row justify="end" style={{ marginBottom: "1rem" }}>
					<Pagination
						total={quantidadeTotal}
						pageSize={filtroCandidatura.size}
						current={filtroCandidatura.page}
						onChange={paginar}
					/>
				</Row>
				<>
					{candidaturas && candidaturas?.length > 0 ? (
						candidaturas?.map((c: CandidaturaType) => (
							<Row key={c.codEstudante} className={styles.containerVaga} align="middle">
								<Col span={19}>
									<Row style={{ width: "100%" }} justify="space-between">
										<Link to={`/estudante/perfil/${c?.codEstudante}`}>
											{capitalizaPriLetraDeCadaPalavra(c?.nomeEstudante)}
										</Link>
										<Tag color={getTagColor(c?.status)}>{statusCandidaturaEnum.get(c?.status)}</Tag>
									</Row>
									<Row>
										{c?.competenciasEstudante?.map(c => {
											return (
												<div style={{ marginRight: "1rem" }} key={c.codCompetencia}>
													<CaretRightOutlined
														style={{
															color: "var(--secondary-color)",
														}}
													/>{" "}
													{capitalizaPriLetraDeCadaPalavra(c.descricaoCompetencia)}
												</div>
											);
										})}
									</Row>
								</Col>
								<Col span={c?.status === APROVADO ? 4 : 3} style={{ marginLeft: "1rem" }}>
									<Row justify="space-between">
										{c?.status === APROVADO ? (
											<>
												<Tooltip title={t("contact_by_whatsapp")}>
													<Button
														icon={<WhatsAppOutlined />}
														disabled={!(c.status === APROVADO)}
														secondary
														onClick={() => entrarEmContato(c.codEstudante)}
													/>
												</Tooltip>
												<Tooltip title={t("contact_by_email")}>
													<Button
														icon={<MailOutlined />}
														disabled={!(c.status === APROVADO)}
														secondary
														onClick={() => entrarEmContatoEmail(c.codEstudante)}
													/>
												</Tooltip>
												<Tooltip title={t("finish")}>
													<Button
														icon={<CheckOutlined />}
														disabled={!(c.status === APROVADO)}
														onClick={() => mudarCandidatura(c.codEstudante, FINALIZADO)}
													/>
												</Tooltip>
											</>
										) : (
											<>
												<Tooltip title={t("reject")}>
													<Button
														icon={<CloseOutlined />}
														disabled={!statusModificaveis.includes(c?.status)}
														onClick={() => mudarCandidatura(c.codEstudante, REPROVADO)}
													/>
												</Tooltip>

												<Tooltip title={t("accept")}>
													<Button
														icon={<CheckOutlined />}
														disabled={!statusModificaveis.includes(c?.status)}
														secondary
														onClick={() => mudarCandidatura(c.codEstudante, APROVADO)}
													/>
												</Tooltip>
											</>
										)}
									</Row>
								</Col>
							</Row>
						))
					) : (
						<Empty description={t("empty_candidates")} />
					)}
				</>
				<Row justify="end">
					<Pagination
						total={quantidadeTotal}
						pageSize={filtroCandidatura.size}
						current={filtroCandidatura.page}
						onChange={paginar}
					/>
				</Row>
			</>
		</>
	);
};

export default CandidatosEmpresa;
