import { Card as CardAntd, CardProps } from "antd";

export interface CustomCardProps extends CardProps {}

const Card = (props: CustomCardProps) => {
	return <CardAntd {...props}>{props.children}</CardAntd>;
};

export default Card;
