export const myWidget = window.cloudinary.createUploadWidget(
	{
		cloudName: "dlkvupjc7",
		uploadPreset: "ml_default",
		multiple: false,
		defaultSource: "local",
		sources: ["local", "url"],
		cropping: true,
		
		styles: {
			palette: {
				window: "#000000",
				sourceBg: "#000000",
				windowBorder: "#8E9FBF",
				tabIcon: "#FFFFFF",
				inactiveTabIcon: "#8E9FBF",
				menuIcons: "#D699EF",
				link: "#D699EF",
				action: "#336BFF",
				inProgress: "#D699EF",
				complete: "#33ff00",
				error: "#EA2727",
				textDark: "#000000",
				textLight: "#FFFFFF",
			},
		},
	},
	(error: any, result: any) => {
		if (!error && result && result.event === "success") {
			document.getElementById("uploadedImage")?.setAttribute("src", result.info.secure_url);
		}
	}
);