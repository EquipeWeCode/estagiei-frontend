/// <reference types="vite-plugin-svgr/client" />

import { Button, Col, Dropdown, Image, Menu, Row, Space } from "antd";
import styles from "./styles.module.scss";
import { useAuth } from "@/contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import TraducaoBtn from "../TraducaoBtn";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { getToken, logout } from "@/services/autenticacao";
import { useTranslation } from "react-i18next";

const Header = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const menu = (
		<Menu
			items={[
				{
					key: "1",
				label: t("internships"),
					onClick: () => {
						navigate("/vagas");
					}
				},
				{
					key: "2",
					label: t("logout_button"),
					onClick: () => {
						fazLogout();
					},
				},
			]}
		/>
	);

	const fazLogout = () => {
		setUser({});
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
							<Col className={styles.translateButton}></Col>
							<Col className={styles.welcomeTextHeader}>
								{capitalizaPriLetraDeCadaPalavra(user.nome)}
							</Col>
							<Col>
								<Dropdown className={styles.dropdown} overlay={menu} placement="bottomRight" trigger={["click"]}>
									<img
										className={styles.userImage}
										src={user.avatar}
										alt={t("user")}
										// preview={false}
										
									/>
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
									<Link to={"/vagas"}>{t("im_company")}</Link>
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
