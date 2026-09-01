import { useState, useEffect } from 'react';
import { listarLivros } from '../api/livros';
import './Livros.css';
import { Link } from 'react-router-dom';

function Livros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarLivros() {
      try {
        const response = await listarLivros();
        setLivros(response.data);
      } catch (err) {
        setErro('Não foi possível carregar os livros');
      } finally {
        setCarregando(false);
      }
    }

    carregarLivros();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="erro">{erro}</p>;

  return (
    <div className="livros-page">
      <div className="livros-header">
       <h1>Livros</h1>
          <Link to="/livros/novo" className="btn-novo">+ Novo Livro</Link>
      </div>

      {livros.length === 0 ? (
        <p className="livros-vazio">Nenhum livro cadastrado ainda.</p>
      ) : (
        <ul className="livros-lista">
          {livros.map((livro) => (
            <li key={livro.id} className="livro-linha">
              <span className="livro-lombada" />
              <div className="livro-info">
                <span className="livro-titulo">{livro.titulo}</span>
                <span className="livro-autor">{livro.autor.nome}</span>
              </div>
              <div className="livro-categorias">
                {livro.categorias.map((cat) => (
                  <span key={cat.id} className="livro-categoria-tag">
                    {cat.nome}
                  </span>
                ))}
              </div>
              <span className="livro-paginas">{livro.numeroPaginas}p</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Livros;