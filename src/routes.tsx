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

render(
	<AuthProvider>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
				<Route path="login" element={<Login />} />
        <Route path="/cadastro/estudante" element={
          <PrivateRoute>
            <CadastroEstudante />
          </PrivateRoute>
        } />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</AuthProvider>,
	document.getElementById("root")
);
