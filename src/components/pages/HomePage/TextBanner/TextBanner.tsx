import styles from "./styles.module.css";

type TextBannerProps = {
	title: string;
	subtitle: string;
};

const TextBanner = (props: TextBannerProps) => {
	const { title, subtitle } = props;

	return (
		<>
			<span>{title}</span>
			<span className={styles.subtitle}>{subtitle}</span>
		</>
	);
};

export default TextBanner;
