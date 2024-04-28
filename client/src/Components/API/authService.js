import API from './api';

const login = async (username, password) => {
  try {
    const response = await API.post('/auth/login', { username, password });
    return response;
  } catch (error) {
    // Handle errors, misalnya menampilkan pesan error
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export { login, register };