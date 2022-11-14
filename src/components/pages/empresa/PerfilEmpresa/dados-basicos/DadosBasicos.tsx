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
			<Col sm={7} md={10}>
				<div className={styles.containerDados}>
					<span className={styles.containerNome}>
						<div>CNPJ: {cpfCnpjMask(user.cnpj)}</div>
						<div>Nome Fantasia: {user.nomeFantasia}</div>
						<div>Razão social: {user.razaoSocial}</div>
            			<div>Data da inclusão: {user.auditoria?.dataInclusao}</div>
					</span>
				</div>
			</Col>
			<Col>
			 	<div className={styles.containerDados}>
					<span className={styles.containerNome}>
						<div>{user.endereco?.cidade} - {user.endereco?.estado}</div>
						<div>Bairro: {user.endereco?.bairro}</div>
						<div>CEP: {user.endereco?.cep}</div>
						<div>Logradouro: {user.endereco?.logradouro} {user.endereco?.numero ? user.endereco?.numero : ''}</div>
						{user.endereco?.complemento && <div>Complemento: {user.endereco?.complemento}</div>}
					</span>
				</div>
			</Col>
		</Row>
	);
};

export default DadosBasicos;
