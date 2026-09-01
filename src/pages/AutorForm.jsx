import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarAutor } from '../api/autores';
import '../pages/LivroForm.css';

function AutorForm() {
  const [nome, setNome] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    try {
      await criarAutor({ nome, nacionalidade, dataNascimento });
      navigate('/autores');
    } catch (err) {
      setErro('Não foi possível criar o autor.');
    }
  };

  return (
    <div className="livro-form-page">
      <h1>Novo Autor</h1>

      {erro && <p className="erro">{erro}</p>}

      <form className="livro-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required />

        <label>Nacionalidade</label>
        <input value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)} />

        <label>Data de nascimento</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AutorForm;