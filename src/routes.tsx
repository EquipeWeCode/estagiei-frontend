import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "antd/dist/antd.less";

import PaginaInicial from "./components/pages/pagina-inicial";
import TelaTeste from "./components/pages/teste";

render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<PaginaInicial />} />
			<Route path="/teste" element={<TelaTeste />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
