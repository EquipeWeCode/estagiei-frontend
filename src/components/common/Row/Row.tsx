import { Col, Row as RowAntd, RowProps } from "antd";

interface RowPropsCustom extends RowProps {
	rowTitle?: string;
}

const Row = (props: RowPropsCustom) => {
	const { rowTitle, children } = props;

	return (
		<RowAntd
			{...props}
			style={{
				...props.style,
				width: "100%",
			}}
		>
			<Col span={24} style={{ textAlign: "center" }}>
				{rowTitle && <h2>{rowTitle}</h2>}
			</Col>
			{children}
		</RowAntd>
	);
};

export default Row;
