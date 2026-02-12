import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/employees/'),
  getById: (employeeId) => api.get(`/employees/${employeeId}`),
  create: (employeeData) => api.post('/employees/', employeeData),
  delete: (employeeId) => api.delete(`/employees/${employeeId}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: (employeeId = null) => {
    const params = employeeId ? { employee_id: employeeId } : {};
    return api.get('/attendance/', { params });
  },
  getByEmployee: (employeeId) => api.get(`/attendance/${employeeId}`),
  create: (attendanceData) => api.post('/attendance/', attendanceData),
};

// Summary API
export const summaryAPI = {
  getStats: () => api.get('/stats/'),
};

export default api;
