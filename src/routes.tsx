import { render } from 'react-dom';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import 'antd/dist/antd.less';

import PaginaInicial from './components/pages/pagina-inicial/index';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

