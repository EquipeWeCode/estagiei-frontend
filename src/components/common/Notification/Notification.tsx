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

	const showNotification = () => {
		notificationAntd.open({
			message: selector.message,
			placement: "topRight",
			duration: 4,
      type: "error",
		});
    dispatch({ type: "HIDE_MESSAGE" });
	};

	return (
		<>
			{props.children}
		</>
	);
};

export default Notification;
