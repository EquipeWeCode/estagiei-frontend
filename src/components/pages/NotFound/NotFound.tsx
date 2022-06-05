import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";

import { ReactComponent as Logo } from "@/assets/notfound.svg";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<>
			<Row className="container-notfound" justify="center">
				<Col className="notfound">
					<Logo width="150" height="150" />
					<h1>{t("not_found")}</h1>
				</Col>
			</Row>
		</>
	);
};

export default NotFound;
