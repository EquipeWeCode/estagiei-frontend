import { Pagination as PaginationAntd, PaginationProps } from "antd";
import styles from "./styles.module.scss";

const Pagination = (props: PaginationProps) => {
	const { total, pageSize, current, onChange } = props;

	return (
		<PaginationAntd
			{...props}
			defaultCurrent={1}
			hideOnSinglePage={false}
			className={styles.paginationCustom}
		/>
	);
};

export default Pagination;
