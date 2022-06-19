import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, putEstudante } from "@/services/estudante";
import { StudentType } from "@/types/userTypes";
import { CompetenciaType } from "@/types/competenciaType";
import { getCompetencias } from "@/services/competencias";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";

const CadastroEstudante = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [novoUser, setNovoUser] = useState<StudentType>(user);
	const [competencias, setCompetencias] = useState<CompetenciaType[]>([]);

	useEffect(() => {
		fetchEstudante();
		fetchCompetencias();
	}, []);

	useEffect(() => {
		setNovoUser(user);
	}, [user]);

	const fetchEstudante = async () => {
		const estudanteBuscado = await getEstudante(user.codEstudante);
		const data: StudentType = estudanteBuscado.data;
		setUser(data);
	};

	const fetchCompetencias = async () => {
		const competencias = await getCompetencias();
		const data: CompetenciaType[] = competencias.data;
		setCompetencias(data);
	};

	const INITIAL_VALUES = {
		nome: novoUser.nome,
		cpf: novoUser.cpf,
		rg: novoUser.rg,
		instEnsino: novoUser.instEnsino,
	};

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const salvaEstudante = async () => {
		await putEstudante(user.codEstudante, novoUser);
		const response = await getEstudante(user.codEstudante);
		setUser(response.data);
		navigate("/");
	};

	return (
		<div className="container-cadastro-estudante">
			<Row justify="center" className="cadastro">
				<Row className="info-dados">
					<Row justify="center">
						<h2>{t("edit_your_profile")}</h2>
					</Row>
					<Form
						onFinish={salvaEstudante}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							console.log(changedValues);
							setNovoUser({
								...novoUser,
								...allValues,
							});
							if (changedValues.dataNascimento) {
								const dataNascimento: Moment | string =
									changedValues.dataNascimento != null
										? moment(changedValues.dataNascimento).format(dateFormatDto)
										: "";
								setNovoUser({ ...novoUser, dataNascimento });
							}
						}}
						initialValues={INITIAL_VALUES}
					>
						<Form.Item>
							<span>{t("name")}</span>
							<Form.Item name="nome" noStyle rules={RULES}>
								<Input placeholder={t("name")} value={novoUser.nome} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>CPF</span>
							<Form.Item name="cpf" noStyle rules={RULES}>
								<Input placeholder={"CPF"} value={novoUser.cpf} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>RG</span>
							<Form.Item name="rg" noStyle rules={RULES}>
								<Input placeholder={"RG"} value={novoUser.rg} maxLength={12} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("birth_date")}</span>
							<Form.Item name="dataNascimento" noStyle rules={RULES}>
								<DatePicker
									style={{ width: "100%", marginBottom: "0.4rem", borderRadius: "0.5rem" }}
									name="dataNascimento"
									placeholder={t("birth_date")}
									value={
										novoUser.dataNascimento
											? moment(novoUser.dataNascimento, dateFormatDto)
											: undefined
									}
									format={dateFormat}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("education")}</span>
							<Form.Item name="instEnsino" noStyle>
								<Input placeholder={t("education")} value={novoUser.instEnsino} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("skills")}</span>
							<Form.Item noStyle>
								<Select
									showArrow
									mode="multiple"
									value={novoUser.competencias?.map(competencia => competencia.codCompetencia)}
									placeholder={t("skills")}
									onChange={(value: (number | undefined)[] | undefined) => {
										setNovoUser({
											...novoUser,
											competencias: value && value.map(codCompetencia => ({ codCompetencia })),
										});
									}}
								>
									{competencias &&
										competencias.map(competencia => (
											<Select.Option
												key={competencia.codCompetencia}
												value={competencia.codCompetencia}
											>
												{competencia.descricaoCompetencia}
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Form.Item>

						<Form.Item style={{ marginTop: "1rem" }}>
							<Button ghost type="primary" style={{ marginRight: "2rem" }}>
								<Link to={"/"}>{t("go_back")}</Link>
							</Button>
							<Button htmlType="submit" type="primary">
								{t("save")}
							</Button>
						</Form.Item>
					</Form>
				</Row>
			</Row>
		</div>
	);
};

export default CadastroEstudante;
