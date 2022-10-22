import { PerfilEstudanteProps } from "../PerfilEstudante";

const Candidaturas = ({ user }: PerfilEstudanteProps) => {
	const { candidaturas } = user;

	return (
		<>
			{candidaturas?.map(candidatura => (
				<ul key={`${candidatura?.codVaga}_${candidatura?.codEstudante}`}>
					<li>{candidatura?.codVaga}</li>
				</ul>
			))}
		</>
	);
};

export default Candidaturas;
