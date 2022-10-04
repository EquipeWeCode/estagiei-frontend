/// <reference types="vite-plugin-svgr/client" />
import { useAuth } from "@/contexts/auth";
import { getVagasRecomendadas } from "@/services/estudante";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { ReactComponent as StudentBanner } from "@/assets/fundos/student-banner.svg";
import styles from "./styles.module.css";
import TextBanner from "./TextBanner";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import CarouselVagas from "@/components/common/CarouselVagas";

const HomePage = (): JSX.Element => {
	
	const { user } = useAuth();
	
	const { t } = useTranslation();

	return (
		<>
			<Row className={styles.banner}>
				<Row className={styles.bannerContainer} justify="space-around" align="middle">
					<Col className={styles.bannerText} md={24} xl={12}>
						<TextBanner />
						<div>
							<Button secondary className={styles.bannerButton}>
								<Link to="/cadastro">{t("signup")}</Link>
							</Button>
						</div>
					</Col>
					<Col className={styles.studentImage} span={12}>
						<StudentBanner className={styles.studentSvg} />
					</Col>
					<Col></Col>
				</Row>
			</Row>
			<Row justify="center" align="middle" style={{marginTop: "1.4rem"}}>
				<Col>
					<h1>{t("some_of_our_jobs")}</h1>
				</Col>
			</Row>
			<Row justify="center" className={styles.vagasContainer}>
				<CarouselVagas />
			</Row>
		</>
	);
};

export default HomePage;
