import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import { ReactComponent as Logo } from "@/assets/notfound.svg";
import Card from "@/components/common/Card";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<>
			<Card>
				<Row justify="center" align="middle">
					<Col>
						<Logo />
					</Col>
				</Row>
			</Card>
			{/* <Row className="container-notfound" justify="center">
				<Col className="notfound">
					<Logo width="150" height="150" />
					<h1>{t("not_found")}</h1>
				</Col>
			</Row> */}
		</>
	);
};

export default NotFound;
