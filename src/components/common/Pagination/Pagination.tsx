import { Pagination as PaginationAntd, PaginationProps } from "antd";
import styles from "./styles.module.scss";

const Pagination = (props: PaginationProps) => {
	return (
		<PaginationAntd
			{...props}
			defaultCurrent={1}
			hideOnSinglePage={true}
			className={styles.paginationCustom}
		/>
	);
};

export default Pagination;
