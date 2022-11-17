import ImageNotFound from "@/components/common/ImageNotFound";
import Row from "@/components/common/Row";
import { cpfCnpjMask } from "@/utils/masks";
import { Col } from "antd";
import { PerfilEstudanteProps } from "../PerfilEstudante";
import styles from "./styles.module.css";

const DadosBasicos = ({ user, isVisualizacao }: PerfilEstudanteProps) => {
	return (
		<>
			<Row justify="center" align="middle">
				<span className={styles.containerFoto}>
					{user.avatar ? <img src={user.avatar} alt="Avatar" /> : <ImageNotFound width={100} />}
				</span>
			</Row>
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
		</>
	);
};

export default DadosBasicos;
