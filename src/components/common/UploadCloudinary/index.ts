export const myWidget = window.cloudinary.createUploadWidget(
	{
		cloudName: "dlkvupjc7",
		uploadPreset: "ml_default",
		multiple: false,
		defaultSource: "local",
		sources: ["local", "url"],
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
			fonts: {
				default: null,
				"'Space Mono', monospace": {
					url: "https://fonts.googleapis.com/css?family=Space+Mono",
					active: true,
				},
			},
		},
	},
	(error, result) => {
		if (!error && result && result.event === "success") {
			console.log("Done! Here is the image info: ", result.info);
			document.getElementById("uploadedimage")?.setAttribute("src", result.info.secure_url);
		}
	}
);