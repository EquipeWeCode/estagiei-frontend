import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/antd.less";
import "@/app.scss";
import "@/loading.css";
import "@/translations/i18n";

import HomePage from "@/components/pages/HomePage";
import Login from "@/components/pages/Login";
import Header from "@/components/common/Header";
import NotFound from "@/components/pages/NotFound";
import { AuthProvider } from "@/contexts/auth";
import Footer from "@/components/common/Footer";
import PrivateRoute from "@/components/pages/PrivateRoute";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Notification from "@/components/common/Notification";
import DescricaoVaga from "./components/pages/DescricaoVaga";
import Vagas from "./components/pages/Vagas";
import { EMPRESA, ESTUDANTE } from "./constants";
import TraducaoBtn from "./components/common/TraducaoBtn";
import PerfilEstudante from "@/components/pages/estudante/PerfilEstudante";
import PerfilEmpresa from "@/components/pages/empresa/PerfilEmpresa";

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
