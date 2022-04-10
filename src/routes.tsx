import { render } from 'react-dom';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import PaginaInicial from './components/container/pagina-inicial';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

