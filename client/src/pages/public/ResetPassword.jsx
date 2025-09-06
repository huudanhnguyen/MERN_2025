// src/pages/public/ResetPassword.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'; // Sử dụng useLocation để lấy query params
import { apiResetPassword } from '../../api/user'; // Import hàm API

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null); // Lưu trữ token từ URL

    const location = useLocation(); // Để lấy query params
    const navigate = useNavigate(); // Để chuyển hướng sau khi thành công

    // Lấy token từ URL khi component mount
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token'); // Lấy token từ '?token=...'
        
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError('Token đặt lại mật khẩu không hợp lệ hoặc không có.');
        }
    }, [location.search]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!token) {
            setError('Không tìm thấy token để đặt lại mật khẩu.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
            setLoading(false);
            return;
        }

        if (password.length < 6) { // Thêm kiểm tra độ dài mật khẩu
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            setLoading(false);
            return;
        }

        try {
            const response = await apiResetPassword(token, password);
            setMessage(response.data.data || 'Mật khẩu của bạn đã được đặt lại thành công!');
            
            // Chuyển hướng về trang đăng nhập sau 3 giây
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.error || 'Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (error && !token) { // Hiển thị lỗi ngay nếu không có token hợp lệ ban đầu
        return (
            <div className="w-full bg-gray-100 flex justify-center pt-20 pb-20 min-h-screen">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi!</h2>
                    <p className="text-red-500 mb-6">{error}</p>
                    <Link to="/forgot-password" className="font-medium text-main hover:underline">
                        Yêu cầu đặt lại mật khẩu mới
                    </Link>
                </div>
            </div>
        );
    }

    // Hiển thị form hoặc thông báo thành công
    return (
        <div className="w-full bg-gray-100 flex justify-center pt-20 pb-20 min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg h-fit">
                
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Reset Password</h1>
                <p className="text-center text-gray-500 mb-8">
                    Please enter your new password.
                </p>

                {message && (
                    <p className="text-center text-green-600 mb-4 bg-green-100 p-2 rounded-md">
                        {message}
                    </p>
                )}
                {error && (
                    <p className="text-center text-red-600 mb-4 bg-red-100 p-2 rounded-md">
                        {error}
                    </p>
                )}

                {token && !message && ( // Chỉ hiển thị form nếu có token và chưa có thông báo thành công
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="6"
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                                           placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Enter your new password"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="confirmPassword" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm New Password
                            </label>
                            <input 
                                type="password" 
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm 
                                           placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Confirm your new password"
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                                       text-lg font-bold text-white bg-main hover:bg-red-700 focus:outline-none 
                                       focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Đang đặt lại...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                {/* Nếu đã có thông báo thành công, không hiển thị form nữa */}
                {!message && !token && (
                     <p className="mt-8 text-center text-sm text-gray-500">
                        Quay lại {' '}
                        <Link to="/login" className="font-medium text-main hover:underline">
                            Đăng nhập
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;