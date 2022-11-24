import styles from "./styles.module.css";

import { useAuth } from "@/contexts/auth";
import { UserType } from "@/types/userTypes";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import DadosBasicos from "./dados-basicos";
import MinhasVagas from "./minhas-vagas";

export interface PerfilEmpresaProps {
	user: UserType;
	isVisualizacao?: boolean;
	codEmpresa?: string | number;
}

type PerfilmenuProps = {
	isVisualizacao?: boolean;
};

const PerfilEmpresa = ({ isVisualizacao }: PerfilmenuProps) => {
	const { user } = useAuth();
	const { t } = useTranslation();

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
		items.push(getItem(t("my_jobs"), "my_jobs", <ProfileOutlined />));
	}

	const setaPagina = (e: any) => {
		setPaginaAtual(e.key);
	};

	const getPaginaAtual = () => {
		switch (paginaAtual) {
			case "dados_basicos":
				return (
					<DadosBasicos
						isVisualizacao={isVisualizacao}
						codEmpresa={user?.codEmpresa || id}
						user={user}
					/>
				);
			case "my_jobs":
				return !isVisualizacao && <MinhasVagas user={user} />;
			default:
				return (
					<DadosBasicos
						isVisualizacao={isVisualizacao}
						user={user}
						codEmpresa={user?.codEmpresa || id}
					/>
				);
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

export default PerfilEmpresa;
