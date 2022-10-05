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
		modules: {
			generateScopedName: "[name]__[local]___[hash:base64:5]",
			localsConvention: "camelCase",
		},
		preprocessorOptions: {
			less: {
				modifyVars: {
					"primary-color": "#D699EF", // mudar cor das variaveis padrao do antd por aqui
				},
				javascriptEnabled: true,
			},
		},
	},

	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
