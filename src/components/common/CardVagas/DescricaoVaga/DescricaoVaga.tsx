import { VagaComCandidaturaType } from "@/components/common/CardVagas/CardVagas";
import { ESTUDANTE } from "@/constants";
import { postCandidatura } from "@/services/candidatura";
import { EnderecoType } from "@/types/enderecoType";
import { UserType } from "@/types/userTypes";
import {
	capitalizaPriLetraDeCadaPalavra,
	cepMask,
	cpfCnpjMask,
	dateMask,
	realMask,
} from "@/utils/masks";
import {
	BulbOutlined,
	CaretRightOutlined,
	ClockCircleOutlined,
	DollarOutlined,
	EnvironmentOutlined,
	HomeOutlined,
	ReadOutlined,
} from "@ant-design/icons";
import { Col, Divider, message, Row, Space, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Button";
import CandidatosEmpresa from "../../CandidatosEmpresa";
import ImageNotFound from "../../ImageNotFound";
import styles from "./styles.module.css";

export interface DescricaoVagaProps {
	vaga: VagaComCandidaturaType;
	user: UserType;
	refDrawer: any;
	isEmpresa?: boolean;
	fetchCandidaturas?: () => void;
}

const DescricaoVaga = (props: DescricaoVagaProps) => {
	const { t } = useTranslation();
	const { competencias } = props.user;

	const { vaga, user, refDrawer, fetchCandidaturas, isEmpresa } = props;
	const { endereco: enderecoVaga } = vaga;
	const { empresa } = vaga;
	const navigate = useNavigate();
	const location = useLocation();
	const codEstudante = user.codEstudante;
	const codVaga = vaga.codVaga;

	const roles = user?.roles;
	const isEstudante = roles?.includes(ESTUDANTE);
	const { TabPane } = Tabs;

	const getLocalVaga = (vaga: VagaComCandidaturaType) => {
		if (vaga?.modalidade === "REMOTO") {
			return t("remote");
		} else if (!vaga?.endereco?.estado) {
			return t("not_informed");
		} else {
			return (
				capitalizaPriLetraDeCadaPalavra(vaga?.endereco?.cidade) +
				" " +
				(vaga?.endereco?.estado && "  / " + vaga?.endereco?.estado)
			);
		}
	};

	const fazCandidatura = async () => {
		if (!roles) {
			refDrawer?.current?.fechaDrawer();
			navigate(`/login?notAuthenticated=true&next=${location?.pathname}${location?.search || ""}`);
		} else {
			const { status } = await postCandidatura(codEstudante, codVaga);

			if (status === 201) {
				refDrawer?.current?.fechaDrawer();
				fetchCandidaturas && fetchCandidaturas();
				message.success(t("success_apply"));
			}
		}
	};

	const getEndereco = (endereco: EnderecoType | undefined) => {
		return (
			<>
				<Row>
					{capitalizaPriLetraDeCadaPalavra(endereco?.logradouro)}, {endereco?.numero} -{" "}
					{capitalizaPriLetraDeCadaPalavra(endereco?.bairro)}
				</Row>
				<Row>
					{capitalizaPriLetraDeCadaPalavra(endereco?.cidade)} - {endereco?.estado}
					{endereco?.cep && ", " + cepMask(endereco?.cep)}
				</Row>
			</>
		);
	};

	const isCompetenciaVagaIgualACompetenciaEstudante = (codCompetenciaVaga: number | undefined) => {
		return competencias?.some(competencia => competencia.codCompetencia === codCompetenciaVaga);
	};

	return (
		<div className={styles.containerDescricaoVaga}>
			<Row className={styles.dadosBasicos} justify="space-between" align="middle">
				<Col className={styles.colTitulo}>
					<span className={styles.tituloEmpresa}>{vaga?.titulo}</span>
					<Link to={`/empresa/perfil/${empresa?.codEmpresa}`}>
						<span>{empresa?.nomeFantasia}</span>
					</Link>
					<Row
						className={styles.dadosLista + " " + styles.dadosListaText}
						style={{ marginTop: "1.4rem" }}
					>
						{t("created_at")}: {dateMask(vaga?.auditoria?.dataInclusao)}
					</Row>
					{vaga?.auditoria?.dataAlteracao && (
						<Row className={styles.dadosLista + " " + styles.dadosListaText}>
							<>
								{t("last_modified")}
								{": "}
								{dateMask(vaga?.auditoria?.dataAlteracao)}
							</>
						</Row>
					)}

					{(isEstudante || !user?.roles) && (
						<Space direction="vertical" style={{ marginTop: "1rem" }}>
							{vaga?.isCandidatada ? (
								<Link to={`/estudante/meu-perfil?tab=candidaturas`}>
									<Button secondary>{t("applied")}</Button>
								</Link>
							) : (
								<Button secondary label={t("apply")} onClick={fazCandidatura} />
							)}
						</Space>
					)}
				</Col>
				<Col>
					<Row className={styles.dadosLista}>
						<DollarOutlined /> {vaga?.salario ? realMask(vaga?.salario) : t("not_informed")}
					</Row>
					<Row className={styles.dadosLista}>
						<ClockCircleOutlined />{" "}
						{vaga?.cargaHoraria ? vaga?.cargaHoraria + `h/${t("day")}` : t("not_informed")}
					</Row>
					<Row className={styles.dadosLista}>
						<HomeOutlined /> {capitalizaPriLetraDeCadaPalavra(vaga?.modalidade)}
					</Row>
					<Row className={styles.dadosLista}>
						<EnvironmentOutlined /> {getLocalVaga(vaga)}
					</Row>
				</Col>
			</Row>

			<Tabs defaultActiveKey="1" style={{ width: "95%", alignSelf: "center" }}>
				<TabPane tab={t("details")} key="1">
					<p className={styles.descricaoVaga}>{vaga?.descricao}</p>
					<Divider />
					<Row className={styles.dadosLista}>
						<ReadOutlined /> {t("courses")}
					</Row>
					<Row>{vaga?.curso || "N/A"}</Row>
					<Divider />
					<Row className={styles.dadosLista}>
						<BulbOutlined /> Soft-skills
					</Row>
					<Row className={styles.descricaoVaga}>
						{vaga?.competencias?.map(c => {
							return (
								<div style={{ marginRight: "1rem" }} key={c.codCompetencia}>
									<CaretRightOutlined
										style={{
											color: isCompetenciaVagaIgualACompetenciaEstudante(c.codCompetencia)
												? "var(--primary-color)"
												: "var(--secondary-color)",
										}}
									/>{" "}
									{capitalizaPriLetraDeCadaPalavra(c.descricaoCompetencia)}
								</div>
							);
						})}
					</Row>
					<Divider />
					{vaga?.modalidade !== "REMOTO" && (
						<>
							<Row className={styles.dadosLista}>
								<EnvironmentOutlined /> <span>{t("address")}</span>
							</Row>
							{getEndereco(enderecoVaga)}
						</>
					)}
				</TabPane>
				<TabPane tab={t("about_company")} key="2">
					<Col className={styles.dadosEmpresa}>
						<Link to={`/empresa/perfil/${empresa?.codEmpresa}`}>
							{empresa?.avatar ? (
								<>
									<img
										src={empresa?.avatar}
										alt="avatar-company"
										className={styles.companyImage}
										width={100}
										height={100}
									/>
								</>
							) : (
								<ImageNotFound width={100} height={100} className={styles.companyImage} />
							)}
						</Link>
						<span>
							<Link to={`/empresa/perfil/${empresa?.codEmpresa}`}>
								<Row className={styles.nomeEmpresa}>
									{capitalizaPriLetraDeCadaPalavra(empresa?.nomeFantasia)}
								</Row>
							</Link>
							<Row>{cpfCnpjMask(empresa?.cnpj)}</Row>
							<>{getEndereco(empresa?.endereco)}</>
						</span>
					</Col>
				</TabPane>
				{isEmpresa && (
					<TabPane tab={t("candidates")} key="3">
						<CandidatosEmpresa codEmpresa={user?.codEmpresa} codVaga={codVaga} />
					</TabPane>
				)}
			</Tabs>
		</div>
	);
};

export default DescricaoVaga;
