import { getVagas } from "@/services/vaga";
import { SIZE_FILTER_DEFAULT } from "@/constants";
import C from "react-multi-carousel";
import carouselStyles from "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { FiltroVagaType, VagaType } from "@/types/vagasTypes";
import styles from "./styles.module.css";
import { Col, Divider, Row, Tag } from "antd";
import { capitalizaPriLetraDeCadaPalavra, realMask } from "@/utils/masks";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { useTranslation } from "react-i18next";
import { CaretLeftOutlined, CaretRightOutlined, LeftOutlined } from "@ant-design/icons";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Carousel = C.default ? C.default : C;

const CarouselVagas = () => {
	const FILTRO_INICIAL: FiltroVagaType = {
		size: SIZE_FILTER_DEFAULT,
		page: 1,
	};

	const [vagas, setVagas] = useState<VagaType[]>([]);
	const [filtroVaga, setFiltroVaga] = useState<FiltroVagaType>(FILTRO_INICIAL);

	useEffect((): void => {
		fetchVagas();
	}, []);

	const navigate = useNavigate();
	const { t } = useTranslation();

	const fetchVagas = async () => {
		const response = await getVagas(filtroVaga);
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 2500 },
			items: 4,
		},
		largeDesktop: {
			breakpoint: { max: 1920, min: 1860 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 1859, min: 1260 },
			items: 2,
		},
		tablet: {
			breakpoint: { max: 1259, min: 0 },
			items: 1,
		},
	};

	const getTagColor = (modalidadeVaga: string = "") => {
		switch (modalidadeVaga) {
			case "REMOTO":
				return "green";
			case "PRESENCIAL":
				return "blue";
			case "HIBRIDO":
				return "purple";
			default:
				return "geekblue";
		}
	};

	return (
		<div className={styles.carouselContainer}>
			<Carousel
				draggable={false}
				responsive={responsive}
				ssr={false}
				infinite={true}
				keyBoardControl={true}
				focusOnSelect={true}
				slidesToSlide={1}
				customLeftArrow={
					<span className={[styles.arrow, styles.leftArrow].join(" ")}>
						<CaretLeftOutlined />
					</span>
				}
				customRightArrow={
					<span className={[styles.arrow, styles.rightArrow].join(" ")}>
						<CaretRightOutlined />
					</span>
				}
				removeArrowOnDeviceType={["tablet"]}
				containerClass={carouselStyles.carouselContainer}
			>
				{vagas?.map(vaga => {
					return (
						<div key={vaga.codVaga} className={styles.vagaCarousel}>
							<Row justify="center" align="top" style={{ width: "100%", textAlign: "center" }}>
								<Col span={24}>
									<Row className={styles.rowTopVaga} justify="space-around">
										<Tag className={styles.tagVagas} color={getTagColor(vaga.modalidade)}>
											{vaga.modalidade}
										</Tag>
										<h3>{vaga.cargaHoraria}h</h3>
									</Row>
								</Col>
								<Col span={24} className={styles.companyInfo}>
									<h2 style={{ height: "60px" }}>{vaga?.titulo}</h2>
									<span className={styles.companyName}>
										{capitalizaPriLetraDeCadaPalavra(vaga?.empresa?.nomeFantasia)}
									</span>
								</Col>
								<Col span={24}>
									<div className={styles.descricaoVaga}>{vaga?.descricao}</div>
								</Col>
								<Col span={24}>
									<span className={styles.salarioVaga}>{realMask(vaga?.salario)}</span>
									<Row justify="center">
										<Button secondary onClick={() => navigate("/vagas")}>
											{t("see_more")}
										</Button>
									</Row>
								</Col>

								<Divider style={{ minWidth: "70%", maxWidth: "70%", marginBottom: "0.5rem" }} />

								<Col span={24}>
									<Row justify="center">
										<h4>
											{vaga?.endereco?.estado} - {vaga?.endereco?.cidade}
										</h4>
									</Row>
								</Col>
							</Row>
						</div>
					);
				})}
			</Carousel>
		</div>
	);
};

export default CarouselVagas;
