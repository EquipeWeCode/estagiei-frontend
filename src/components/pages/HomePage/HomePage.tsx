import { useAuth } from "@/contexts/auth";
import { getVagas } from "@/services/vaga";
import { StudentType } from "@/types/userTypes";
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

	// const [student, setStudent] = useState<StudentType>({} as StudentType);

	useEffect((): void => {
		if (!signed) {
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
	// 	if (user.id) {
	// 		fetchStudent(user.id);
	// 	}
	// }, [user]);

	// const fetchStudent = async (id: string) => {
	// 	const response = await getStudent(id);
	// 	const student = await response.data;
	// 	setStudent(student as StudentType);
	// };

	return (
		<>
			<Row justify="space-between" style={{ padding: "2rem" }}>
				<Col className="container-info-user" span={6}>
					<h2>Informações de cadastro</h2>
					<img src={user.avatar} alt={t("user")} />
					<div className="info-user">
						<h4>Nome: {user.name}</h4>
						<h4>Email: {user.email}</h4>
					</div>
				</Col>

				<Col className="container-vagas" span={12}>
					<h2>Vagas</h2>

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
