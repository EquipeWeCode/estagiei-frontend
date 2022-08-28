import { VagaType } from "@/types/vagasTypes";
import { Col, Empty, Tag, Space } from "antd";
import { CompetenciaType } from "@/types/competenciaType";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";
import { COLORS } from '@/constants/colors'

interface CardVagasProps {
	vagas: VagaType[];
	competenciasEstudante: CompetenciaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const retornaCorTag = (competencia: CompetenciaType): string => {
		return props.competenciasEstudante.find(
			comp => comp.codCompetencia === competencia.codCompetencia
		)
			? COLORS.primary_color
			: "#000";
	};

	return (
		<>
			{props.vagas && props.vagas.length > 0 ? (
				props.vagas.map((vaga: VagaType) => (
					<Col key={vaga.codVaga} className="container-vaga">
						<div className="vaga-titulo">
							<h3 style={{ display: "inline-block" }}>
								<strong>{vaga.titulo} </strong>
							</h3>
							<span style={{ color: "var(--primary-color)" }}>
								{vaga.empresa && capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
							</span>
						</div>
						<p>{vaga.descricao}</p>
						<p style={{fontSize: "1rem" }}>
							R$
							{vaga.salario.toLocaleString("pt-BR", {
								maximumFractionDigits: 2,
								minimumFractionDigits: 2,
							})}
						</p>
						{vaga.competencias &&
							vaga.competencias.map((competencia: CompetenciaType) => (
								<Tag style={{borderRadius: "1rem", padding: "0.2rem 0.4rem", marginBottom: "0.5rem"}} key={competencia.codCompetencia} color={retornaCorTag(competencia)}>
									{competencia.descricaoCompetencia}
								</Tag>
							))}
					</Col>
				))
			) : (
				<Empty description="Nenhuma vaga encontrada." />
			)}
		</>
	);
};

export default CardVagas;
