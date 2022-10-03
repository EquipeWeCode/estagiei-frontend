import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/antd.less";
import "@/app.css";
import "@/loading.css";
import "@/translations/i18n";

import HomePage from "@/components/pages/HomePage";
import Login from "@/components/pages/Login";
import Header from "@/components/common/Header";
import NotFound from "@/components/pages/NotFound";
import { AuthProvider } from "@/contexts/auth";
import Footer from "@/components/common/Footer";
import PrivateRoute from "@/components/pages/PrivateRoute";
import CadastroEstudante from "@/components/pages/CadastroEstudante";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Notification from "@/components/common/Notification";
import LoginEmpresa from "./components/pages/LoginEmpresa";
import DescricaoVaga from "./components/pages/DescricaoVaga";
import Vagas from "./components/pages/Vagas";
import { ESTUDANTE } from "./constants";

render(
	<Provider store={store}>
		<Notification>
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/estudante/login" element={<Login />} />
						<Route path="/empresa/login" element={<LoginEmpresa />} />
						<Route path="/vagas" element={<Vagas />} />
						<Route path="/descricaoVaga" element={<DescricaoVaga />} />
						<Route path="/cadastro/estudante" element={<CadastroEstudante />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</Notification>
	</Provider>,
	document.getElementById("root")
);
