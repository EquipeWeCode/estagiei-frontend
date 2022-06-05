import { useAuth } from "@/contexts/auth";
import { getVagas } from "@/services/vaga";
import { getEstudante } from "@/services/estudante";
import { StudentType } from "@/types/userTypes";
import { VagasType } from "@/types/vagasTypes";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = (): JSX.Element => {
	const { user, signed, setUser } = useAuth();
	const [vagas, setVagas] = useState<VagasType[]>([]);
	const navigate = useNavigate();
	const { t } = useTranslation();

	// const [estudante, setEstudante] = useState<StudentType>({} as StudentType);

	useEffect((): void => {
		if (!signed || !user) {
			navigate("/login");
		} else {
			fetchVagas();
		}
	}, [signed]); // melhorar isso depoi

	const fetchVagas = async () => {
		const response = await getVagas({});
		if (response.status === 200) {
			setVagas(response.data);
		}
	};

	// useEffect((): void => {
	// 	if (user.codEstudante) {
	// 		fetchStudent(user.codEstudante);
	// 	}
	// }, [user]);

	// const fetchStudent = async (id: string) => {
	// 	const response = await getEstudante(id);
	// 	const estudante = await response.data;
	// 	setEstudante(estudante as StudentType);
	// };

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
