import axios from '../axios'; // Import instance axios đã cấu hình

// Hàm này nhận vào data là { email, password }
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data // Gửi email và password trong body của request
});

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data
});

export const apiVerifyEmail = (token) => axios({
    url: `/user/verify-email/${token}`,
    method: 'get'
});
// THÊM HÀM NÀY VÀO
export const apiForgotPassword = (email) => axios({
    url: '/user/forgotpassword', // Đảm bảo URL này khớp với backend của bạn
    method: 'post',
    data: { email } // Gửi email trong body của request
});

// THÊM HÀM NÀY CHO RESET MẬT KHẨU SAU KHI CLICK LINK
export const apiResetPassword = (token, password) => axios({
    url: `/user/resetpassword/${token}`, // Đảm bảo URL này khớp với backend của bạn
    method: 'put', // Sử dụng PUT method
    data: { password } // Gửi mật khẩu mới trong body
});