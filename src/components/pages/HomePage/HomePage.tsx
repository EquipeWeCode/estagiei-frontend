import { useAuth } from "@/contexts/auth";
import { getStudent } from "@/services/student";
import { StudentType } from "@/types/userTypes";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = (): JSX.Element => {
	const { t } = useTranslation();
	const { user, signed } = useAuth();
	const navigate = useNavigate();
	const [student, setStudent] = useState<StudentType>({} as StudentType);

	useEffect((): void => {
		if (!signed) {
			navigate("/login");
		}
	}, [signed]); // melhorar isso depois

	useEffect((): void => {
		if (user.id) {
			fetchStudent(user.id);
		}
	}, [user]);

	const fetchStudent = async (id: string) => {
		const response = await getStudent(id);
		const student = await response.data;
		setStudent(student as StudentType);
	};

	return (
		<>
			<Row justify="center">
				<Col>
					<h1>{t("welcome") + `, ${user.name}`}</h1>
					{t("date_format", { date: new Date() })}

					<ul>
						<li>
							{t("student_code")}: {student.codEstudante || "Não encontrado"}
						</li>
						<li>
            <li>
							{t("name")}: {student.nome || "Não encontrado"}
						</li>
            <li>
							cpf: {student.cpf || "Não encontrado"}
						</li>
							{t("student_experience")}: {student.experienciaProfissional || "Não encontrado"}
						</li>
						{/* <li>
							{t("institution")}: {student.instituicaoEnsino}
						</li> */}
						<li>
							{t("student_level")}: {student.nivelEscolaridade || "Não encontrado"}
						</li>
					</ul>
				</Col>
			</Row>
		</>
	);
};

export default HomePage;
