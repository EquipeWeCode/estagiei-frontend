import { Row as RowAntd, RowProps } from "antd";

const Row = (props: RowProps) => {
	return (
		<RowAntd
      {...props}
			style={{
				width: "100%",
        border: "1px solid red",
			}}
		>
			{props.children}
		</RowAntd>
	);
};

export default Row;
