const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
    svgr(),
		vitePluginImp({
			optimize: true,
			libList: [
				{
					libName: "antd",
					libDirectory: "es",
					style: name => `antd/es/${name}/style`,
				},
			],
		}),
	],

	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					"primary-color": "#c045f4", // mudar cor das variaveis padrao do antd por aqui
				},
				javascriptEnabled: true,
			},
		},
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
