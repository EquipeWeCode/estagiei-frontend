import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/app.scss";
import "@/loading.css";
import "@/translations/i18n";
import "antd/dist/antd.less";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import HomePage from "@/components/pages/HomePage";
import Login from "@/components/pages/Login";
import NotFound from "@/components/pages/NotFound";
import PrivateRoute from "@/components/pages/PrivateRoute";
import { AuthProvider } from "@/contexts/auth";

import Notification from "@/components/common/Notification";
import PerfilEmpresa from "@/components/pages/empresa/PerfilEmpresa";
import PerfilEstudante from "@/components/pages/estudante/PerfilEstudante";
import { Provider } from "react-redux";
import TraducaoBtn from "./components/common/TraducaoBtn";
import CadastroEmpresa from "./components/pages/CadastroEmpresa";
import CadastroEstudante from "./components/pages/CadastroEstudante/CadastroEstudante";
import Vagas from "./components/pages/Vagas";
import { EMPRESA, ESTUDANTE } from "./constants";
import { store } from "./redux/store";

render(
	<Provider store={store}>
		<Notification>
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<TraducaoBtn />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/vagas" element={<Vagas />} />
						<Route path="/cadastro/empresa" element={<CadastroEmpresa />} />
						<Route path="/cadastro/estudante" element={<CadastroEstudante />} />
						<Route
							path="/estudante/meu-perfil"
							element={
								<PrivateRoute roles={[ESTUDANTE]}>
									<PerfilEstudante />
								</PrivateRoute>
							}
						/>
						<Route
							path="/empresa/meu-perfil"
							element={
								<PrivateRoute roles={[EMPRESA]}>
									<PerfilEmpresa />
								</PrivateRoute>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</Notification>
	</Provider>,
	document.getElementById("root")
);
