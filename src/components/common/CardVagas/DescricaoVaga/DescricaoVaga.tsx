import { VagaComCandidaturaType } from "@/components/common/CardVagas/CardVagas";
import { ESTUDANTE } from "@/constants";
import { postCandidatura } from "@/services/candidatura";
import { UserType } from "@/types/userTypes";
import { Col, message, Row } from "antd";
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
			<Row className={styles.dadosBasicos}>
				<Col className={styles.colTitulo}>
					<span className={styles.tituloEmpresa}>{vaga?.titulo}</span>
					<Link to={`/empresa/profile/${empresa?.codEmpresa}`}>
						<span>{empresa?.nomeFantasia}</span>
					</Link>
					<Row className={styles.dadosLista}> 
						
					</Row>
				</Col>
			</Row>


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
