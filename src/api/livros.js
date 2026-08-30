import api from './axios';

export const listarLivros = () => api.get('/livros');

export const buscarLivro = (id) => api.get(`/livros/${id}`);

export const criarLivro = (dados) => api.post('/livros', dados);

export const atualizarLivro = (id, dados) => api.put(`/livros/${id}`, dados);

export const deletarLivro = (id) => api.delete(`/livros/${id}`);