import { VagaType } from "@/types/vagasTypes";
import { Col, Tag } from "antd";
import { CompetenciaType } from "@/types/competenciaType";
import { capitalizaPriLetraDeCadaPalavra } from "@/utils/masks";

interface CardVagasProps {
	vagas: VagaType[];
}

const CardVagas = (props: CardVagasProps): JSX.Element => {
	return (
		<>
			{props.vagas.map((vaga: VagaType) => (
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
							<Tag key={competencia.codCompetencia} color={"#c045f4"}>
								{competencia.descricaoCompetencia}
							</Tag>
						))}
				</Col>
			))}
		</>
	);
};

export default CardVagas;
