import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarCategoria } from '../api/categorias';
import '../pages/LivroForm.css';

function CategoriaForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    try {
      await criarCategoria({ nome, descricao });
      navigate('/categorias');
    } catch (err) {
      setErro('Não foi possível criar a categoria.');
    }
  };

  return (
    <div className="livro-form-page">
      <h1>Nova Categoria</h1>

      {erro && <p className="erro">{erro}</p>}

      <form className="livro-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Descrição</label>
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CategoriaForm;