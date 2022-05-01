import { useState } from "react";
import { i18n } from "../../../translations/i18n";
import { Button } from "antd";

const Header = () => {
	// const [language, setLanguage] = useState("en");

	const changeLanguage = (e: string) => {
		// setLanguage(e);
		i18n.changeLanguage(e);
	};

	return (
		<div className="App">
			<Button name="pt" onClick={() => changeLanguage("pt")}>
				Português
			</Button>
			<Button name="en" onClick={() => changeLanguage("en")}>
				English
			</Button>
		</div>
	);
};

export default Header;
