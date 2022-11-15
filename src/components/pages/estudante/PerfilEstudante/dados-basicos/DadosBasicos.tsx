import ImageNotFound from "@/components/common/ImageNotFound";
import { cpfCnpjMask } from "@/utils/masks";
import { Col, Row } from "antd";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import styles from "./styles.module.css";

const DadosBasicos = ({ user, isVisualizacao }: PerfilEstudanteProps) => {
	return (
		<Row>
			<Col sm={2} md={5}>
				<div className={styles.containerFoto}>
					{user.avatar ? <img src={user.avatar} alt="Avatar" /> : <ImageNotFound width={100} />}
				</div>
			</Col>
			<Col sm={15} md={19}>
				<div className={styles.containerDados}>
					<span className={styles.containerNome}>
						<div>{user.nome}</div>
						<div>{user.email}</div>
						<div>{cpfCnpjMask(user.cpf)}</div>
					</span>
				</div>
				(Em desenvolvimento)
			</Col>
		</Row>
	);
};

export default DadosBasicos;
