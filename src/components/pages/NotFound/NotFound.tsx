import { ReactComponent as Logo } from "@/assets/notfound.svg";
import ButtonVoltar from "@/components/common/ButtonVoltar";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<>
			<Row className={styles.containerNotfound} justify="center">
				<Col className={styles.notfound}>
					<Logo width="150" height="150" />
					<h1>{t("not_found")}</h1>
					<ButtonVoltar secondary />
				</Col>
			</Row>
		</>
	);
};

export default NotFound;
