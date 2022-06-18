import { VagaType } from "@/types/vagasTypes";
import { Col, Empty, Tag } from "antd";
import { CompetenciaType } from "@/types/competenciaType";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";

interface CardVagasProps {
	vagas: VagaType[];
	competenciasEstudante: CompetenciaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	const retornaCorTag = (competencia: CompetenciaType): string => {
		return props.competenciasEstudante.find(
			comp => comp.codCompetencia === competencia.codCompetencia
		)
			? "#c045f4"
			: "#000";
	};

	return (
		<>
      {props.vagas && props.vagas.length > 0 ?
			props.vagas.map((vaga: VagaType) => (
				<Col md={11} key={vaga.codVaga} className="container-vaga">
					<h3 style={{ display: "inline-block" }}>
						<strong>{vaga.titulo} </strong>
					</h3>
					{vaga.empresa && " - " + capitalizaPriLetraDeCadaPalavra(vaga.empresa.nomeFantasia)}
					<p>{vaga.descricao}</p>
					<p>
						R$
						{vaga.salario.toLocaleString("pt-BR", {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						})}
					</p>
					{vaga.competencias &&
						vaga.competencias.map((competencia: CompetenciaType) => (
							<Tag key={competencia.codCompetencia} color={retornaCorTag(competencia)}>
								{competencia.descricaoCompetencia}
							</Tag>
						))}
				</Col>
			)) : 
      (
        <Empty description="Nenhuma vaga a recomendar."/>
      )}
		</>
	);
};

export default CardVagas;
