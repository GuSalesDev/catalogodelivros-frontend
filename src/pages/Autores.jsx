import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarAutores } from '../api/autores';
import './Autores.css';

function Autores() {
  const [autores, setAutores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const response = await listarAutores();
      setAutores(response.data);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="autores-page">
      <div className="autores-header">
        <h1>Autores</h1>
        <Link to="/autores/novo" className="btn-novo">+ Novo Autor</Link>
      </div>

      {autores.length === 0 ? (
        <p className="lista-vazia">Nenhum autor cadastrado ainda.</p>
      ) : (
        <ul className="autores-lista">
          {autores.map((autor) => (
            <li key={autor.id} className="autor-linha">
              <span className="autor-nome">{autor.nome}</span>
              <span className="autor-nacionalidade">{autor.nacionalidade}</span>
              <span className="autor-nascimento">{autor.dataNascimento}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autores;