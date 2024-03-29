import { ReactComponent as StudentBanner } from "@/assets/fundos/student-banner.svg";
import Button from "@/components/common/Button";
import CarouselVagas from "@/components/common/CarouselVagas";
import { useAuth } from "@/contexts/auth";
import { UserType } from "@/types/userTypes";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import C from "react-multi-carousel";
import carouselStyles from "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import TextBanner from "./TextBanner";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Carousel = C.default ? C.default : C;

type BannerProps = {
	user: UserType;
	title: string;
	subtitle: string;
	buttonText: string;
	type: "estudante" | "empresa";
};

const Banner = (props: BannerProps) => {
	const { user, title, subtitle, buttonText, type } = props;

	return (
		<Row className={styles.banner}>
			<Row className={styles.bannerContainer} justify="space-around" align="middle">
				<Col className={styles.bannerText} md={24} xl={12}>
					<TextBanner title={title} subtitle={subtitle} />
					<div>
						{!user.roles && (
							<Button secondary className={styles.bannerButton}>
								<Link to={`/cadastro/${type}`}>{buttonText}</Link>
							</Button>
						)}
					</div>
				</Col>
				<Col className={styles.studentImage} span={12}>
					{type === "estudante" ? (
						<StudentBanner className={styles.studentSvg} />
					) : (
						<img
							src="https://res.cloudinary.com/dlkvupjc7/image/upload/v1664977159/company-banner-png_vhreut.png"
							className={styles.studentSvg}
						/>
					)}
				</Col>
			</Row>
		</Row>
	);
};

const HomePage = (): JSX.Element => {
	const { user } = useAuth();

	const { t } = useTranslation();

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 9999, min: 1201 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1200, min: 0 },
			items: 1,
		},
	};

	return (
		<>
			<Carousel
				draggable={false}
				responsive={responsive}
				ssr={false}
				infinite={true}
				keyBoardControl={true}
				focusOnSelect={true}
				slidesToSlide={1}
				autoPlay={true}
				showDots={true}
				autoPlaySpeed={5000}
				removeArrowOnDeviceType={["superLargeDesktop", "tablet"]}
				containerClass={carouselStyles.carouselContainer}
			>
				<Banner
					type="estudante"
					key={1}
					buttonText={t("signup")}
					user={user}
					title={t("banner_text")}
					subtitle={t("banner_subtitle")}
				/>
				<Banner
					type="empresa"
					key={2}
					buttonText={t("advertise_my_jobs")}
					user={user}
					title={t("banner_text_company")}
					subtitle={t("banner_subtitle_company")}
				/>
			</Carousel>

			<Row justify="center" align="middle" style={{ marginTop: "1.4rem" }}>
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
