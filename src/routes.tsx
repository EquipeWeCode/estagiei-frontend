import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/antd.less";
import "./loading.css";

import PaginaInicial from "./components/pages/PaginaInicial";
import TelaTeste from "./components/pages/Teste";

render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PaginaInicial />} />
			{/* <Route path="/teste" element={<TelaTeste />} /> */}
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
