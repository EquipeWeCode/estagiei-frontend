import { useState } from "react";
import { i18n } from "../../../translations/i18n";
import { Button, Menu } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { useAuth } from "@/contexts/auth";
import GoogleLogout from "../GoogleLogout";

const Header = () => {
	// const [language, setLanguage] = useState("en");

	const auth = useAuth();

	const changeLanguage = (e: string) => {
		i18n.changeLanguage(e);
	};

	return (
		<header>
			<div className="header-itens">
				<div className="logo">
					{/* <img src="#" alt="Logo" width={75} /> */}
          <h2 style={{color: '#fff'}}>Logo</h2>
				</div>

				<ul className="itens">
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
				</ul>
			</div>
		</header>
	);
};

export default Header;
