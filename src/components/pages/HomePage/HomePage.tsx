import { useAuth } from "@/contexts/auth";
import { getVagas } from "@/services/vaga";
import { VagasType } from "@/types/vagasTypes";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = (): JSX.Element => {
	const { user, signed } = useAuth();
	const [vagas, setVagas] = useState<VagasType[]>([]);
	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect((): void => {
		if (!signed || !user) {
			navigate("/login");
		} else {
			fetchVagas();
		}
	}, [signed]); // melhorar isso depois

	const fetchVagas = async () => {
		const response = await getVagas({});
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	return (
		<>
			<Row justify="space-between" style={{ padding: "2rem" }}>
				<Col className="container-info-user" span={6}>
					<h2>{t("info_registration")}</h2>
					<img src={user.avatar} alt={t("user")} />
					<div className="info-user">
						<h4>{t("name")}: {user.nome}</h4>
						<h4>E-mail: {user.email}</h4>
					</div>
				</Col>

				<Col className="container-vagas" span={12}>
					<h2>{t("vacancies")}</h2>

					{vagas.map((vaga: VagasType) => (
						<div key={vaga.codVaga} className="container-vaga">
							<h3>{vaga.titulo}</h3>
							<p>{vaga.descricao}</p>
							<p>
								R$
								{vaga.salario.toLocaleString("pt-BR", {
									maximumFractionDigits: 2,
									minimumFractionDigits: 2,
								})}
							</p>
						</div>
					))}
				</Col>
			</Row>
		</>
	);
};

export default HomePage;
