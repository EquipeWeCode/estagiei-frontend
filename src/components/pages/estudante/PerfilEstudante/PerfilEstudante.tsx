import { useAuth } from "@/contexts/auth";
import { UserType } from "@/types/userTypes";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import Candidaturas from "./candidaturas";
import DadosBasicos from "./dados-basicos";
import styles from "./styles.module.css";

export interface PerfilEstudanteProps {
	user: UserType;
	codEstudante?: string | number;
	isVisualizacao?: boolean;
}

type PerfilmenuProps = {
	isVisualizacao?: boolean;
};

const PerfilEstudante = (props: PerfilmenuProps) => {
	const { user } = useAuth();
	const { t } = useTranslation();
	const { isVisualizacao = false } = props;

	let { id } = useParams();

	const [searchParams, setSearchParams] = useSearchParams();

	const tab = searchParams.get("tab");

	const [paginaAtual, setPaginaAtual] = useState(tab || "dados_basicos");

	useEffect(() => {
		setSearchParams({ tab: paginaAtual });
	}, [paginaAtual]);

	type MenuItem = Required<MenuProps>["items"][number];

	const getItem = (
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	};

	const items: MenuItem[] = [getItem(t("personal_information"), "dados_basicos", <UserOutlined />)];

	if (!isVisualizacao) {
		items.push(getItem(t("applies"), "candidaturas", <ProfileOutlined />));
	}

	const setaPagina = (e: any) => {
		setPaginaAtual(e.key);
	};

	const getPaginaAtual = () => {
		switch (paginaAtual) {
			case "dados_basicos":
				return <DadosBasicos codEstudante={user?.codEstudante || id} user={user} isVisualizacao={isVisualizacao} />;
			case "candidaturas":
				return !isVisualizacao && <Candidaturas user={user} />;
			default:
				return <DadosBasicos codEstudante={user?.codEstudante || id} user={user} isVisualizacao={isVisualizacao} />;
		}
	};

	return (
		<div className="container">
			<div className={styles.containerPerfil}>
				<div className={styles.menu}>
					<Menu items={items} onClick={setaPagina} selectedKeys={[paginaAtual]} />
				</div>
				<div className={styles.containerDetalhes}>{getPaginaAtual()}</div>
			</div>
		</div>
	);
};

export default PerfilEstudante;
