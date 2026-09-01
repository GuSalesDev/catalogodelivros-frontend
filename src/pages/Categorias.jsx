import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarCategorias } from '../api/categorias';
import './Autores.css';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const response = await listarCategorias();
      setCategorias(response.data);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="autores-page">
      <div className="autores-header">
        <h1>Categorias</h1>
        <Link to="/categorias/novo" className="btn-novo">+ Nova Categoria</Link>
      </div>

      {categorias.length === 0 ? (
        <p className="lista-vazia">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <ul className="autores-lista">
          {categorias.map((cat) => (
            <li key={cat.id} className="autor-linha">
              <span className="autor-nome">{cat.nome}</span>
              <span className="autor-nacionalidade">{cat.descricao}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Categorias;