import axios from 'axios';

const instance = axios.create({
    baseURL: '/api'
});
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // <-- Thay 'access_token' bằng key bạn dùng để lưu token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;