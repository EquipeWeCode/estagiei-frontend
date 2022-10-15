import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { DatePicker, Form, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { getEstudante, postEstudante, putEstudante } from "@/services/estudante";
import { CadastroEstudanteType, UserType } from "@/types/userTypes";
import { CompetenciaType } from "@/types/competenciaType";
import { getCompetencias } from "@/services/competencias";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import { getToken } from "@/services/autenticacao";

const TerminoCadastro = () => {
	const { user, setUser } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [token, setToken] = useState(getToken());

	const [novoEstudante, cadastrarEstudante] = useState<CadastroEstudanteType>({} as CadastroEstudanteType);

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, []);

	const dateFormat = "DD/MM/YYYY";
	const dateFormatDto = "YYYY-MM-DD";

	const RULES = [
		{
			required: true,
			message: t("required"),
		},
	];

	const salvaEstudante = async () => {
		const response = await postEstudante(novoEstudante);
		navigate("/");
	};

	return (
		<div className="container-geral">
			<Row justify="center" className="cadastro">
				<Row className="info-dados">
					<Row justify="center">
						<h2>{t("edit_your_profile")}</h2>
					</Row>
					<Form
						onFinish={salvaEstudante}
						name="cadastroEstudante"
						onValuesChange={(changedValues, allValues) => {
							cadastrarEstudante({
								...novoEstudante,
								...allValues,
								dataNascimento: moment(allValues.dataNascimento).format(dateFormatDto),
							});
						}}
					>
						<Form.Item>
							<span>{t("name")}</span>
							<Form.Item name="nome" noStyle rules={RULES}>
								<Input placeholder={t("name")} value={novoEstudante.nome} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>CPF</span>
							<Form.Item name="cpf" noStyle rules={RULES}>
								<Input placeholder={"CPF"} value={novoEstudante.cpf} maxLength={14} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>RG</span>
							<Form.Item name="rg" noStyle rules={RULES}>
								<Input placeholder={"RG"} value={novoEstudante.rg} maxLength={12} />
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
										novoEstudante.dataNascimento
											? moment(novoEstudante.dataNascimento, dateFormatDto)
											: undefined
									}
									format={dateFormat}
								/>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("education")}</span>
							<Form.Item name="instEnsino" noStyle>
								<Input placeholder={t("education")} value={novoEstudante.instEnsino} />
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<span>{t("skills")}</span>
							<Form.Item noStyle>
								<Select
									showArrow
									mode="multiple"
									value={novoEstudante.competencias?.map(competencia => competencia.codCompetencia)}
									placeholder={t("skills")}
									onChange={(value: (number | undefined)[] | undefined) => {
										cadastrarEstudante({
											...novoEstudante,
											competencias: value && value.map(codCompetencia => ({ codCompetencia })),
										});
									}}
								>
									{novoEstudante.competencias &&
										novoEstudante.competencias.map(competencia => (
											<Select.Option
												key={competencia.codCompetencia}
												value={competencia.codCompetencia}
											>
												{undefined}
											</Select.Option>
										))}
								</Select>
							</Form.Item>
						</Form.Item>

						<Form.Item style={{ marginTop: "1rem" }}>
							<Button style={{ marginRight: "2rem", backgroundColor: "#000", color: "#FFF" }}>
								<Link to={"/login"}>{t("go_back")}</Link>
							</Button>
							<Button htmlType="submit" type="primary">
								{t("save")}
							</Button>
						</Form.Item>
						<Row>
							<span>Cadastre-se como <Link to={"/cadastro/empresa"}>empresa</Link></span>
						</Row>
					</Form>
				</Row>
			</Row>
		</div>
	);
};

export default TerminoCadastro;
