import axios from 'axios';

// Tạo một instance của axios với cấu hình tùy chỉnh
const instance = axios.create({
    // SỬA DÒNG NÀY
    baseURL: '/api' // <-- Đổi thành '/api'
});

// Thêm một interceptor cho request (áp dụng cho 'instance')
instance.interceptors.request.use(
    (config) => {
        // Làm gì đó trước khi request được gửi đi
        // Ví dụ: có thể thêm token xác thực vào đây
        return config;
    },
    (error) => {
        // Làm gì đó với lỗi của request
        return Promise.reject(error);
    }
);

// ... code interceptor cho response giữ nguyên ...

// Export instance để sử dụng ở những nơi khác trong dự án
export default instance;