// src/pages/member/MyAccount.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

// Các mục trong menu
const menuItems = [
    { name: 'Personal Information', path: '/my-account/profile' },
    { name: 'My Orders', path: '/my-account/orders' },
    { name: 'Wishlist', path: '/my-account/wishlist' },
    // Thêm các mục khác nếu cần
];

const MyAccount = () => {
    // Lấy thông tin người dùng từ Redux store
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='w-main mx-auto my-8'>
            <h1 className='text-3xl font-bold mb-8 border-b-2 border-main pb-4'>My Account</h1>
            
            <div className='flex gap-10'>
                {/* --- Cột trái: Menu --- */}
                <div className='w-1/4'>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <div className='flex items-center gap-4 mb-6 pb-6 border-b'>
                            <FaUserCircle size={50} className='text-gray-400' />
                            <div>
                                <p className='text-sm text-gray-500'>Hello,</p>
                                <p className='font-bold text-lg'>{currentUser?.firstname} {currentUser?.lastname}</p>
                            </div>
                        </div>
                        <ul className='space-y-2'>
                            {menuItems.map(item => (
                                <li key={item.name}>
                                    <NavLink 
                                        to={item.path}
                                        className={({ isActive }) => 
                                            `block p-3 rounded-md text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-main text-white hover:bg-main' : ''}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Cột phải: Nội dung --- */}
                <div className='w-3/4'>
                    <div className='bg-white p-8 rounded-lg shadow-md'>
                        {/* Outlet sẽ render component con tương ứng với route */}
                        <Outlet /> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;