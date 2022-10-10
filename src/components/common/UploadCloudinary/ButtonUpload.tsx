import { useEffect } from "react";
import Button from "../Button";
import { myWidget } from "./index";

const ButtonUpload = () => {
	useEffect(() => {
		document.getElementById("upload_widget")?.addEventListener(
			"click",
			function () {
				myWidget.open();
			},
			false
		);
	}, []);

	return (
		<Button secondary id="upload_widget">
			Upload
		</Button>
	);
};

export default ButtonUpload;
