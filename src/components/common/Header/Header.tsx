/// <reference types="vite-plugin-svgr/client" />

import { i18n } from "@/translations/i18n";
import { Col, Dropdown, Image, Menu, Row, Space } from "antd";
import { useAuth } from "@/contexts/auth";
import { Link } from "react-router-dom";
import TraducaoBtn from "../TraducaoBtn";

import { ReactComponent as Logo } from "@/assets/logo.svg";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";

const Header = () => {

	const { user } = useAuth();
	const { t } = i18n;

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: "sair",
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
						<Space>
							<Col className="translate-button">
								<TraducaoBtn />
							</Col>					
							<Col className="welcome-text-header">
								{t("welcome")}: {capitalizaPriLetraDeCadaPalavra(user.nome)}
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
						</Space>
					</Row>
				) : (
					<TraducaoBtn />
				)}
			</Row>
		</header>
	);
};

export default Header;
