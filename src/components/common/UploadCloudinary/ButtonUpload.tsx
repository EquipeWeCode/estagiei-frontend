import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useEffect } from "react";
import Button from "../Button";
import { myWidget } from "./index";

const styles = {
	width: "100px",
	height: "100px",
	borderRadius: "50%",
	border: "1px solid var(--primary-color)",
};

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

	const removeUrlImagem = () => {
		document.querySelector("#uploadedImage")?.setAttribute("src", "");
	};

	return (
		<>
			<Space>
				<Button secondary id="upload_widget" icon={<UploadOutlined />} label="Avatar" />
				<img id="uploadedImage" style={styles} />
				<Button type="primary" danger onClick={removeUrlImagem} icon={<CloseCircleOutlined />} />
			</Space>
		</>
	);
};

export default ButtonUpload;
