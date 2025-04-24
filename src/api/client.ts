import axios from 'axios';

const backendURL: string = import.meta.env.VITE_BACKEND_URL ?? '';

const apiClient = axios.create({
    baseURL: `${backendURL}/api`,
    withCredentials: true
});

export default apiClient;
