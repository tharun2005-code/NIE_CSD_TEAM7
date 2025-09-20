import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth', credentials),
};

// Members API
export const membersAPI = {
  create: (memberData) => api.post('/members', memberData),
  search: (phoneData) => api.post('/members/search', phoneData),
};

// Games API
export const gamesAPI = {
  getAll: () => api.get('/game'),
  create: (gameData) => api.post('/game', gameData),
  play: (playData) => api.post('/game/play', playData),
};

// Collections API
export const collectionsAPI = {
  getByDate: (date) => api.get(`/collection/${date}`),
};

export default api;