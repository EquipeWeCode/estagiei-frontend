/// <reference types="vite-plugin-svgr/client" />

import { Button, Col, Dropdown, Image, Menu, Row, Space } from "antd";
import styles from "./styles.module.css";
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
				<Col className="logo">
					<Link to="/">
						<Logo width="100" height="35" />
					</Link>
				</Col>

				<TraducaoBtn />
				{user?.roles ? (
					<Row gutter={12} align="middle">
						<Space>
							<Col className={styles.translateButton}></Col>
							<Col className={styles.welcomeTextHeader}>
								{t("welcome")}: {capitalizaPriLetraDeCadaPalavra(user.nome)}
							</Col>
							<Col>
								<Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
									<Image
										className={styles.userImage}
										src={user.avatar}
										alt={t("user")}
										width={35}
										preview={false}
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
									<Link to={"/vagas"}>{t("vacancy_btn")}</Link>
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
