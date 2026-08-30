import api from './axios';

export const registrar = (dados) => api.post('/auth/registrar', dados);

export const login = (dados) => api.post('/auth/login', dados);