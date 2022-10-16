import { VagaComCandidaturaType } from "@/components/common/CardVagas/CardVagas";
import { ESTUDANTE } from "@/constants";
import { postCandidatura } from "@/services/candidatura";
import { UserType } from "@/types/userTypes";
import { capitalizaPriLetraDeCadaPalavra, dateMask, justDateMask, realMask } from "@/utils/masks";
import {
	ClockCircleFilled,
	ClockCircleOutlined,
	DollarOutlined,
	EnvironmentOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Col, Divider, message, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageNotFound from "../../ImageNotFound";
import styles from "./styles.module.css";

export interface DescricaoVagaProps {
	vaga: VagaComCandidaturaType;
	user: UserType;
	refDrawer: any;
	fetchCandidaturas: () => void;
}

const DescricaoVaga = (props: DescricaoVagaProps) => {
	const { t } = useTranslation();

	const { vaga, user, refDrawer, fetchCandidaturas } = props;
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

			if (status === 200) {
				refDrawer?.current?.fechaDrawer();
				fetchCandidaturas();
				message.success(t("success_apply"));
			}
		}
	};

	return (
		<div className={styles.containerDescricaoVaga}>
			<Row className={styles.dadosBasicos} justify="space-between" align="middle">
				<Col className={styles.colTitulo}>
					<span className={styles.tituloEmpresa}>{vaga?.titulo}</span>
					<Link to={`/empresa/profile/${empresa?.codEmpresa}`}>
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
					{/* TOOD: Endereco, soft skills e aba de empresa */}
				</TabPane>
			</Tabs>

			{/* <Col className={styles.colImage}>
					<Link to={`/empresa/profile/${empresa?.codEmpresa}`}>
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
				</Col> */}
		</div>
	);
};

export default DescricaoVaga;
