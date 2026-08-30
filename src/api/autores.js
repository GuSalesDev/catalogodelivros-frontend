import api from './axios';

export const listarAutores = () => api.get('/autores');

export const buscarAutor = (id) => api.get(`/autores/${id}`);

export const criarAutor = (dados) => api.post('/autores', dados);

export const atualizarAutor = (id, dados) => api.put(`/autores/${id}`, dados);

export const deletarAutor = (id) => api.delete(`/autores/${id}`);