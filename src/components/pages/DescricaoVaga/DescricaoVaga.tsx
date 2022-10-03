import { Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import styles from './styles.module.css';

const DescricaoVaga = () => {
	const { t } = useTranslation();

	return (
		
		<div className={styles.containerDescricaoVaga}>
			<Row justify="center" className={styles.cadastro}>
				<Row className={styles.infoDados}>
					<Row justify="center">
						<h2>{t("Detalhes da vaga")}</h2>
					</Row>
					<Form>
							
						<div className={styles.descricaoVaga}>
							<span><b>Empresa</b></span>
							<h4>Empresa XPTO</h4>
						</div>
						<div className={styles.descricaoVaga}>
							<span><b>Nome da Vaga</b></span>
							<h4>Vaga de Desenvolvedor NodeJs</h4>
						</div>
						<div className={styles.descricaoVaga}>
							<span><b>Competências</b></span>
							<h4>Proativo</h4>
							<h4>Engajado</h4>
						</div>
						<div className={styles.descricaoVaga}>
							<span><b>Detalhes</b></span>
							<h4><b>Endereço:</b> Avenida de teste</h4>
							<h4><b>Descrição:</b> 3 vagas para desenvolvedor Node Js em São Paulo</h4>
						</div>
						
						<Form.Item style={{ marginTop: "1rem" }}>
							<Button style={{ marginRight: "2rem", backgroundColor: "#000", color: "#FFF" }}>
								<Link to={"/"}>{t("go_back")}</Link>
							</Button>
							<Button htmlType="submit" type="primary">
								{t("Aplicar")}
							</Button>
						</Form.Item>
					</Form>
				</Row>
			</Row>
		</div>
	);
};

export default DescricaoVaga;
