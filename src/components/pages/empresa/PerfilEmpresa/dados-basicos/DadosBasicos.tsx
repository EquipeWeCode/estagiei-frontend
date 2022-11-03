import ImageNotFound from "@/components/common/ImageNotFound";
import { cpfCnpjMask, cpfMask } from "@/utils/masks";
import { Col, Row } from "antd";
import { PerfilEmpresaProps } from "../PerfilEmpresa";
import styles from "./styles.module.css";

const DadosBasicos = ({ user }: PerfilEmpresaProps) => {
	// Deixei aqui apenas como exemplo
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
						<div>CNPJ: {cpfCnpjMask(user.cnpj)}</div>
						<div>Nome Fantasia: {user.nomeFantasia}</div>
						<div>Razão social: {user.razaoSocial}</div>
            <div>Data da inclusão: {user.auditoria?.dataInclusao}</div>
					</span>
				</div>
				(Em desenvolvimento)
			</Col>
		</Row>
	);
};

export default DadosBasicos;
