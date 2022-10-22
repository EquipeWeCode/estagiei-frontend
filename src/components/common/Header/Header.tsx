/// <reference types="vite-plugin-svgr/client" />

import { Col, Dropdown, Menu, Row, Space } from "antd";
import styles from "./styles.module.scss";
import { useAuth } from "@/contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import TraducaoBtn from "../TraducaoBtn";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { getToken, logout } from "@/services/autenticacao";
import { useTranslation } from "react-i18next";
import { EMPRESA, ESTUDANTE } from "@/constants";
import ImageNotFound from "../ImageNotFound";

const Header = () => {
	const { user, setUserContextAndLocalStorage } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const getMenuItems: any = (tipoUsuario: string = "") => {
		const menuItems = [
			{
				key: "1",
				label: t("home"),
				onClick: () => {
					navigate("/");
				},
			},
			{
				key: "2",
				label: t("internships"),
				onClick: () => {
					navigate("/vagas");
				},
			},
			{
				key: "3",
				label: t("my_profile"),
				onClick: () => {
					switch (tipoUsuario) {
						case ESTUDANTE:
							navigate("estudante/meu-perfil");
							break;
						case EMPRESA:
							navigate("empresa/meu-perfil");
						default:
							break;
					}
				},
			},
			{
				key: "99",
				label: t("logout_button"),
				onClick: () => {
					fazLogout();
				},
			},
		];

		// if (tipoUsuario === EMPRESA) {
		// menuItems.push({

		// });

		return menuItems;
	};

	const menu = <Menu items={getMenuItems(user?.roles?.at(0))} />;

	const fazLogout = () => {
		setUserContextAndLocalStorage({});
		logout();
		navigate("/");
	};

	return (
		<header className={styles.headerContainer}>
			<Row className={styles.headerItens} justify="space-between" align="middle">
				<Col className={styles.logo}>
					<Link to="/">
						<Logo className={styles.logoHeader} />
					</Link>
				</Col>

				{user?.roles ? (
					<Row gutter={12} align="middle">
						<Space>
							<Col className={styles.welcomeTextHeader}>
								{capitalizaPriLetraDeCadaPalavra(user.nome?.split(" ")[0] || user.nomeFantasia)}
							</Col>
							<Col>
								<Dropdown
									className={styles.dropdown}
									overlay={menu}
									placement="bottomRight"
									trigger={["click"]}
								>
									{user.avatar ? (
										<img className={styles.userImage} src={user.avatar} alt={t("user")} />
									) : (
										<ImageNotFound width={40} className={styles.userImage} />
									)}
								</Dropdown>
							</Col>
						</Space>
						<TraducaoBtn />
					</Row>
				) : (
					<>
						<Row gutter={12} align="middle">
							<Space>
								<Col>
									<Link to={"/vagas"}>{t("internships")}</Link>
								</Col>
								<span className={styles.linkLogin}>
									<Link className={styles.linkHeader} to={"/login"}>
										{t("signin")}
									</Link>
								</span>
							</Space>
						</Row>
					</>
				)}
			</Row>
		</header>
	);
};

export default Header;
