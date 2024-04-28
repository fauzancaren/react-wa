import axios from 'axios';

// Membuat instance axios dengan beberapa pengaturan dasar
const API = axios.create({
  baseURL: 'http://localhost:3001',  // Base URL untuk semua panggilan API
  headers: {
    'Content-Type': 'application/json'
  }
});

// Anda bisa menambahkan interceptors jika perlu
API.interceptors.request.use(request => {
  // Logika untuk menangani request sebelum dikirim
  // Misalnya, menambahkan token ke header
  request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return request;
});

export default API;
