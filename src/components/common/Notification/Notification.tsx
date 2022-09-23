import { notification as notificationAntd } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface NotificationProps {
	children: React.ReactNode;
}

const Notification = (props: NotificationProps): JSX.Element => {
	const selector = useSelector((state: any) => state.message);
	const dispatch = useDispatch();

	useEffect(() => {
		if (selector.visible) {
			showNotification();
		}
	}, [selector]);

	const arrayMensagens: Array<string> = selector?.message?.split(",");

	const showNotification = () => {
		notificationAntd.open({
			message: "Erro ao solicitar",
			placement: "topRight",
			description: (
				<>
					{arrayMensagens?.map((item: string, idx: number) => (
						<div key={idx}>
							<span>{item}</span>
							<br />
						</div>
					))}
				</>
			),
			duration: 6,
			type: "error",
		});
		dispatch({ type: "HIDE_MESSAGE" });
	};

	return <>{props.children}</>;
};

export default Notification;
