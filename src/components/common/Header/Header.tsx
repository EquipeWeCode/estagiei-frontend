import { useState } from "react";
import { i18n } from "@/translations/i18n";
import { Button, Col, Dropdown, Image, Menu, Row } from "antd";
import { useAuth } from "@/contexts/auth";
import GoogleLogout from "../GoogleLogout";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.svg";

const Header = () => {
	// const [language, setLanguage] = useState("en");

	const { user } = useAuth();
	const { t } = i18n;

	const changeLanguage = (e: string) => {
		i18n.changeLanguage(e);
	};

	return (
		<header>
			<Row className="header-itens" justify="space-between" align="middle">
				<Col className="logo">
					{/* <img src="#" alt="Logo" width={75} /> */}
					<Link to="/">
						{/* <h2 style={{ color: "#fff" }}>estagiei</h2> */}
            <Logo width="100" height="35"/>
					</Link>
				</Col>

				{user.id && (
					<Row gutter={12} align="middle">
						<Col className="welcome-text">
							{t("welcome")}: {user.name}
						</Col>
						<Col>
							<Dropdown overlay={<GoogleLogout />} placement="bottomRight">
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
				)}

				{/* <ul className="itens">
					<li>
						<Button name="pt" onClick={() => changeLanguage("pt")}>
							Português
						</Button>
					</li>
					<li>
						<Button name="en" onClick={() => changeLanguage("en")}>
							English
						</Button>
					</li>

					{auth.signed && (
						<li>
							<GoogleLogout />
						</li>
					)}
				</ul> */}
			</Row>
		</header>
	);
};

export default Header;
