/// <reference types="vite-plugin-svgr/client" />

import { useState } from "react";
import { i18n } from "@/translations/i18n";
import { Button, Col, Dropdown, Image, Menu, Row } from "antd";
import { useAuth } from "@/contexts/auth";
import GoogleLogout from "../GoogleLogout";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "@/assets/logo.svg";
const Header = () => {
	const [language, setLanguage] = useState("pt");

	const { user } = useAuth();
	const { t } = i18n;

	const changeLanguage = (e: string) => {
		setLanguage(e);
		i18n.changeLanguage(e);
	};

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<Button style={{ width: "100%" }} name="pt" onClick={() => changeLanguage("pt")}>
							Português
						</Button>
					),
				},
				{
					key: "2",
					label: (
						<Button style={{ width: "100%" }} name="en" onClick={() => changeLanguage("en")}>
							English
						</Button>
					),
				},
				{
					key: "3",
					label: <GoogleLogout />,
				},
			]}
		/>
	);

	return (
		<header>
			<Row className="header-itens" justify="space-between" align="middle">
				<Col className="logo">
					<Link to="/">
						<Logo width="100" height="35" />
					</Link>
				</Col>

				{user.codEstudante ? (
					<Row gutter={12} align="middle">
						<Col className="welcome-text">
							{t("welcome")}: {user.nome}
						</Col>
						<Col>
							<Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
								<Image
									className="user-image"
									src={user.avatar}
									alt={t("user")}
									width={35}
									preview={false}
								/>
							</Dropdown>
						</Col>
					</Row>
				) : (
					<Row gutter={12}>
						<Col>
							<Button name="pt" onClick={() => changeLanguage("pt")}>
								Português
							</Button>
						</Col>
						<Col>
							<Button name="en" onClick={() => changeLanguage("en")}>
								English
							</Button>
						</Col>
					</Row>
				)}
			</Row>
		</header>
	);
};

export default Header;
