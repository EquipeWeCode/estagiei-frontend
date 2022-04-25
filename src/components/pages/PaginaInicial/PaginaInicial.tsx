import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { getEndpointTeste } from "@/services/teste";

type PaginaInicialProps = {
	children?: React.ReactNode; // teste apenas
};

type TypeTeste = {
	id: number;
	name: string;
	email: string;
	gender: string;
	status: string;
};

interface iTeste {
	key: number;
	id: number;
	name: string;
	email: string;
	gender: string;
}

const PaginaInicial = (props: PaginaInicialProps): JSX.Element => {
	const [count, setCount] = useState<number>(0);
	const [teste, setTeste] = useState<TypeTeste[]>([]);
	const [data, setData] = useState<iTeste[]>([]);

	const increment = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		fetchTeste();
	}, []);

	useEffect(() => {
		if (teste.length > 0) {
			buildTeste();
		}
	}, [teste]);

	const fetchTeste = async () => {
		const response = await getEndpointTeste();
		setTeste(response.data);
	};

	const buildTeste = (): void => {
		teste &&
			setData(
				teste.map((item: TypeTeste, idx: number) => {
					return {
						key: item.id,
						id: item.id,
						name: item.name,
						email: item.email,
						gender: item.gender,
					};
				})
			);
	};

	const columns: ColumnsType<iTeste> = [
		{
			key: "id",
			title: "ID",
			dataIndex: "id",
      width: "10%",
			sorter: (a: any, b: any) => a.id - b.id,
		},
		{
			key: "name",
			title: "Nome",
			dataIndex: "name",
      width: "35%",
		},
		{
			key: "email",
			title: "E-mail",
			dataIndex: "email",
      width: "45%",
		},
		{
			key: "gender",
			title: "Gênero",
			dataIndex: "gender",
      width: "10%",
		},
	];

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
			</Row>

			<Row>
				<Col md={12}>
					<Table<iTeste> columns={columns} dataSource={data} />
				</Col>
			</Row>
		</>
	);
};

export default PaginaInicial;
