import { VagaType } from "@/types/vagasTypes";
import { Col, Empty, Tag, Space,Button, Row } from "antd";
import { CompetenciaType } from "@/types/competenciaType";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { COLORS } from "@/constants/colors";
import NotFound from "../NotFound";
import { Link } from "react-router-dom";

interface CardVagasProps {
	vagas: VagaType[];
	competenciasEstudante: CompetenciaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const retornaCorTag = (competencia: CompetenciaType): string => {
		return props.competenciasEstudante.find(
			comp => comp.codCompetencia === competencia.codCompetencia
		)
			? COLORS.argb.primary_color
			: "default";
	};

	return (
		<>
			{props?.vagas && props?.vagas?.length > 0 ? (
				props?.vagas?.map((vaga: VagaType) => (
					<Row key={vaga.codVaga} className="container-vaga" align="middle">
						<Link to="/empresa/profile">
							<Col className="col-image">
								{vaga?.empresa?.avatar ? (
									<img
										src={vaga?.empresa?.avatar}
										alt="avatar-company"
										width={100}
										height={100}
										style={{ borderRadius: "5px" }}
									/>
								) : (
									<NotFound width={100} height={100} />
								)}
							</Col>
						</Link>
						<Col className="content">
							<Link to="/DescricaoVaga">
								<div className="vaga-titulo">
									<h3 style={{ display: "inline-block" }}>
										<strong>{vaga.titulo} </strong>
									</h3>
									<span style={{ color: "var(--primary-color)" }}>
										{vaga.empresa && capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
									</span>
								</div>
							</Link>
							<div className="col-desc">
								<p>{vaga.descricao}</p>
							</div>
							<p style={{ fontSize: "1rem" }}>
								R$
								{vaga.salario.toLocaleString("pt-BR", {
									maximumFractionDigits: 2,
									minimumFractionDigits: 2,
								})}
							</p>
							{vaga.competencias &&
								vaga.competencias.map((competencia: CompetenciaType) => (
									<Tag
										style={{
											borderRadius: "5px",
											padding: "0.2rem 0.4rem",
											marginBottom: "0.5rem",
										}}
										key={competencia.codCompetencia}
										color={retornaCorTag(competencia)}
									>
										{competencia.descricaoCompetencia}
									</Tag>
								))}
						</Col>
						<Button >
							<Link to="/detalheVaga">Ver detalhes</Link>
						</Button>
					</Row>
				))
			) : (
				<Empty description="Nenhuma vaga encontrada." />
			)}
		</>
	);
};

export default CardVagas;
