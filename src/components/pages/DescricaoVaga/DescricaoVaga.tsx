import { Form, Row, Space, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import { VagaType } from "@/types/vagasTypes";
import { UserType } from "@/types/userTypes";
import { ESTUDANTE } from "@/constants";

export interface DescricaoVagaProps {
	vaga: VagaType;
	user: UserType;
}

const DescricaoVaga = (props: DescricaoVagaProps) => {
	const { t } = useTranslation();

	const { vaga, user } = props;
	const { endereco: enderecoVaga } = vaga;
	const { empresa } = vaga;

	const roles = user?.roles;
	const isEstudante = roles?.includes(ESTUDANTE);

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
									{enderecoVaga?.bairro}, {enderecoVaga?.cidade} - {enderecoVaga?.estado}, {" "}
									{enderecoVaga?.cep}
								</h4>
								<h4>
									<b>{t("description")}:</b> {vaga?.descricao}
								</h4>
							</div>

							{(isEstudante || !user?.roles) && (
								<Space direction="vertical">
									<Button secondary label={t("apply")} />
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
