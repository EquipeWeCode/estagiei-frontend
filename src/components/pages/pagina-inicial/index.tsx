import { Button, Col, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

type PaginaInicialProps = {
	children?: React.ReactNode; // teste apenas
};

const PaginaInicial = (props: PaginaInicialProps): JSX.Element => {
	const [count, setCount] = useState<number>(0);

	const increment = () => {
		setCount(count + 1);
	};

	// https://ant.design/components/grid/

	return (
		<>
			<Row justify="center">
				<Col>
					<Button type="primary" onClick={increment}>
						Incrementar
					</Button>
				</Col>
			</Row>

			<Row justify="space-around">
				<Col span={6}>{`contador: ${count}`}</Col>

				<Col span={6}>
					<Button>
						<Link to={"/teste"}>Ir para teste</Link>
					</Button>
				</Col>
			</Row>
		</>
	);
};

export default PaginaInicial;
