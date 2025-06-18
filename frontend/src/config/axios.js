import axios from 'axios';

// URL base da API - em desenvolvimento usa proxy, em produção usa Railway
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://sistema-orcamentos-production-27eb.up.railway.app'
  : '';

// Criar instância do axios com configuração base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 