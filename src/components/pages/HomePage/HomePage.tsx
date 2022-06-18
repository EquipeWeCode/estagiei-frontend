import CardVagas from "@/components/common/CardVagas";
import { useAuth } from "@/contexts/auth";
import { getVagas } from "@/services/vaga";
import { VagaType } from "@/types/vagasTypes";
import { Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InfoUsuario from "./InfoUsuario";

const HomePage = (): JSX.Element => {
	const { user, signed } = useAuth();
	const [vagas, setVagas] = useState<VagaType[]>([]);
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect((): void => {
		if (!signed || !user) {
			navigate("/login");
		} else {
			fetchVagas();
		}
	}, [signed]); // TODO: melhorar isso depois

	const fetchVagas = async () => {
		const response = await getVagas({});
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	return (
		<>
			<Row justify="center" style={{ padding: "2rem" }}>
				<Col className="container-info-user" span={12}>
					<InfoUsuario user={user} />
				</Col>
			</Row>
			<Divider />
			<Row justify="center">
				<h2>{t("vacancies")}</h2>
			</Row>
			<Row justify="space-evenly" className="row-vagas">
				<CardVagas vagas={vagas} />
			</Row>
		</>
	);
};

export default HomePage;
