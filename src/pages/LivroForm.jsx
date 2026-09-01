import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarLivro } from '../api/livros';
import { listarAutores } from '../api/autores';
import { listarCategorias } from '../api/categorias';
import './LivroForm.css';

function LivroForm() {
  const [titulo, setTitulo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState('');
  const [autorId, setAutorId] = useState('');
  const [categoriaIds, setCategoriaIds] = useState([]);

  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarOpcoes() {
      const [resAutores, resCategorias] = await Promise.all([
        listarAutores(),
        listarCategorias(),
      ]);
      setAutores(resAutores.data);
      setCategorias(resCategorias.data);
    }
    carregarOpcoes();
  }, []);

  const toggleCategoria = (id) => {
    setCategoriaIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    try {
      await criarLivro({
        titulo,
        isbn,
        sinopse,
        dataPublicacao,
        numeroPaginas: Number(numeroPaginas),
        autorId: Number(autorId),
        categoriaIds,
      });
      navigate('/livros');
    } catch (err) {
      setErro('Não foi possível criar o livro. Confira os dados.');
    }
  };

  return (
    <div className="livro-form-page">
      <h1>Novo Livro</h1>

      {erro && <p className="erro">{erro}</p>}

      <form className="livro-form" onSubmit={handleSubmit}>
        <label>Título</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>ISBN</label>
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} required />

        <label>Sinopse</label>
        <textarea value={sinopse} onChange={(e) => setSinopse(e.target.value)} rows={3} />

        <label>Data de publicação</label>
        <input
          type="date"
          value={dataPublicacao}
          onChange={(e) => setDataPublicacao(e.target.value)}
        />

        <label>Número de páginas</label>
        <input
          type="number"
          value={numeroPaginas}
          onChange={(e) => setNumeroPaginas(e.target.value)}
        />

        <label>Autor</label>
        <select value={autorId} onChange={(e) => setAutorId(e.target.value)} required>
          <option value="">Selecione um autor</option>
          {autores.map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nome}
            </option>
          ))}
        </select>

        <label>Categorias</label>
        <div className="categorias-checkboxes">
          {categorias.map((cat) => (
            <label key={cat.id} className="categoria-checkbox">
              <input
                type="checkbox"
                checked={categoriaIds.includes(cat.id)}
                onChange={() => toggleCategoria(cat.id)}
              />
              {cat.nome}
            </label>
          ))}
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default LivroForm;