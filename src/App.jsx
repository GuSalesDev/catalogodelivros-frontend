import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Livros from './pages/Livros';
import LivroForm from './pages/LivroForm';
import Autores from './pages/Autores';
import AutorForm from './pages/AutorForm';
import Categorias from './pages/Categorias';
import CategoriaForm from './pages/CategoriaForm';
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
            <Route path="/livros/novo" element={<LivroForm />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/autores/novo" element={<AutorForm />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/novo" element={<CategoriaForm />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/livros" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;