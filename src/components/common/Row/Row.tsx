import { Col, Row as RowAntd, RowProps } from "antd";

interface RowPropsCustom extends RowProps {
	rowtitle?: string;
	titleAlign?: "left" | "center" | "right";
}

const Row = (props: RowPropsCustom) => {
	const { rowtitle, children, titleAlign } = props;

	return (
		<RowAntd
			{...props}
			style={{
				...props.style,
				width: "100%",
			}}
		>
			<Col span={24} style={{ textAlign: titleAlign || "center" }}>
				{rowtitle && <h2>{rowtitle}</h2>}
			</Col>
			{children}
		</RowAntd>
	);
};

export default Row;
