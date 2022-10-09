import Button from "@/components/common/Button";
import { ESTUDANTE } from "@/constants";
import { UserType } from "@/types/userTypes";
import { VagaType } from "@/types/vagasTypes";
import { Form, Row, Space, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export interface DescricaoVagaProps {
	vaga: VagaType;
	user: UserType;
	refDrawer: any;
}

const DescricaoVaga = (props: DescricaoVagaProps) => {
	const { t } = useTranslation();

	const { vaga, user, refDrawer } = props;
	const { endereco: enderecoVaga } = vaga;
	const { empresa } = vaga;
	const navigate = useNavigate();
	const location = useLocation();

	const roles = user?.roles;
	const isEstudante = roles?.includes(ESTUDANTE);

	const fazCandidatura = () => {
		if (!roles) {
			refDrawer?.current?.fechaDrawer();
			navigate(`/login?next=${location?.pathname}${location?.search || ""}`);
		}
	};

	return (
		<div>
			<div className={styles.containerDescricaoVaga}>
				<Row justify="center" className={styles.cadastro}>
					<Row className={styles.infoDados}>
						<Row justify="center">
							<h2>{t("job_details")}</h2>
						</Row>
						<Form>
							<div className={styles.descricaoVaga}>
								<span>
									<b>{t("company")}</b>
								</span>
								<h4>{empresa?.nomeFantasia}</h4>
							</div>
							<div className={styles.descricaoVaga}>
								<span>
									<b>{t("job_name")}</b>
								</span>
								<h4>{vaga?.titulo}</h4>
							</div>
							<div className={styles.descricaoVaga}>
								<span>
									<b>Soft Skills</b>
								</span>
								{vaga?.competencias?.map(competencia => (
									<div key={competencia.codCompetencia} style={{ marginBottom: "5px" }}>
										<Tag color="blue">{competencia?.descricaoCompetencia}</Tag>
									</div>
								))}
							</div>
							<div className={styles.descricaoVaga}>
								<span>
									<b>{t("details")}</b>
								</span>
								<h4>
									<b>{t("address")}:</b> {enderecoVaga?.logradouro}, {enderecoVaga?.numero},{" "}
									{enderecoVaga?.bairro}, {enderecoVaga?.cidade} - {enderecoVaga?.estado},{" "}
									{enderecoVaga?.cep}
								</h4>
								<h4>
									<b>{t("description")}:</b> {vaga?.descricao}
								</h4>
							</div>

							{(isEstudante || !user?.roles) && (
								<Space direction="vertical">
									<Button secondary label={t("apply")} onClick={fazCandidatura} />
								</Space>
							)}
						</Form>
					</Row>
				</Row>
			</div>
		</div>
	);
};

export default DescricaoVaga;
