import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const vacationAPI = {
  getAllRequests: (status = null) => {
    const params = status ? { status } : {};
    return api.get('/requests', { params });
  },
  getUserRequests: (userId) => api.get(`/requests/user/${userId}`),
  createRequest: (data) => api.post('/requests', data),
  updateStatus: (id, data) => api.put(`/requests/${id}`, data),
  getAllUsers: () => api.get('/users'),
};

export default api;
