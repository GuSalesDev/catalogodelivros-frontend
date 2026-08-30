import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Livros from './pages/Livros';
import Autores from './pages/Autores';
import Categorias from './pages/Categorias';
import Layout from './components/Layout';
import RotaProtegida from './components/RotaProtegida';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        <Route element={<RotaProtegida />}>
          <Route element={<Layout />}>
            <Route path="/livros" element={<Livros />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/categorias" element={<Categorias />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/livros" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;