import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/antd.less";
import '@/app.css';
import "@/loading.css";
import "@/translations/i18n";

import HomePage from "@/components/pages/HomePage";
import Login from "@/components/pages/Login";
import Header from "@/components/common/Header";
import NotFound from "@/components/pages/NotFound";
import { AuthProvider } from "@/contexts/auth";

render(
	<AuthProvider>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById("root")
);
