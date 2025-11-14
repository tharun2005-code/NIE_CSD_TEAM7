import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth', credentials),
  signup: (credentials) => api.post('/auth/signup', credentials),
};

// Members API
export const membersAPI = {
  create: (memberData) => api.post('/members', memberData),
  search: (phoneData) => api.post('/members/search', phoneData),
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  update: (id, memberData) => api.put(`/members/${id}`, memberData),
  delete: (id) => api.delete(`/members/${id}`),
};

// Games API
export const gamesAPI = {
  getAll: () => api.get('/game'),
  getById: (id) => api.get(`/game/${id}`),
  create: (gameData) => api.post('/game', gameData),
  update: (id, gameData) => api.put(`/game/${id}`, gameData),
  delete: (id) => api.delete(`/game/${id}`),
  play: (playData) => api.post('/game/play', playData),
};

// Collections API
export const collectionsAPI = {
  getByDate: (date) => api.get(`/collection/${date}`),
};

// Admin API
export const adminAPI = {
  getAll: () => api.get('/api/admin'),
  getById: (id) => api.get(`/api/admin/${id}`),
  create: (adminData) => api.post('/api/admin', adminData),
  update: (id, adminData) => api.put(`/api/admin/${id}`, adminData),
  delete: (id) => api.delete(`/api/admin/${id}`),
};

// Recharges API
export const rechargesAPI = {
  getAll: () => api.get('/api/recharges'),
  getById: (id) => api.get(`/api/recharges/${id}`),
  create: (rechargeData) => api.post('/api/recharges', rechargeData),
  update: (id, rechargeData) => api.put(`/api/recharges/${id}`, rechargeData),
  delete: (id) => api.delete(`/api/recharges/${id}`),
  getByMemberId: (memberId) => api.get(`/api/recharges/member/${memberId}`),
};

// Transactions API
export const transactionsAPI = {
  getAll: () => api.get('/api/transactions'),
  getById: (id) => api.get(`/api/transactions/${id}`),
  create: (transactionData) => api.post('/api/transactions', transactionData),
  update: (id, transactionData) => api.put(`/api/transactions/${id}`, transactionData),
  delete: (id) => api.delete(`/api/transactions/${id}`),
  getByMemberId: (memberId) => api.get(`/api/transactions/member/${memberId}`),
  getByGameId: (gameId) => api.get(`/api/transactions/game/${gameId}`),
};

export default api;