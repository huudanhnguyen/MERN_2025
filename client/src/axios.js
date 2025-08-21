import axios from 'axios';

// Tạo một instance của axios với cấu hình tùy chỉnh
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
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

// Thêm một interceptor cho response (áp dụng cho 'instance')
instance.interceptors.response.use(
  (response) => {
    // Bất kỳ mã trạng thái nào nằm trong phạm vi 2xx sẽ kích hoạt hàm này
    // Làm gì đó với dữ liệu response
    return response.data;
  },
  (error) => {
    // Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx sẽ kích hoạt hàm này
    // Làm gì đó với lỗi của response
    return error.data;
  }
);

// Export instance để sử dụng ở những nơi khác trong dự án
export default instance;