import { Col, ColProps } from "antd";
import styles from "./styles.module.css";

interface DetailsItemProps extends ColProps {
	label: string;
	value: any;
}

const DetailsItem = (props: DetailsItemProps) => {
	const { sm = 24, md = 12, label, value } = props;

	return (
		<Col sm={sm} md={md}>
			<div className={styles.containerDados}>
				<span>
					<strong>{label}:</strong> {value}
				</span>
			</div>
		</Col>
	);
};

export default DetailsItem;
