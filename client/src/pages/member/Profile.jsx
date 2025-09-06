// src/pages/member/Profile.jsx

import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    // Lấy lại thông tin người dùng từ Redux
    const { currentUser } = useSelector(state => state.user);

    return (
        <div>
            <h2 className='text-2xl font-bold mb-6'>Personal Information</h2>
            <form className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>First Name</label>
                        <input type="text" defaultValue={currentUser?.firstname} className='mt-1 p-2 w-full border rounded-md bg-gray-100' readOnly />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                        <input type="text" defaultValue={currentUser?.lastname} className='mt-1 p-2 w-full border rounded-md bg-gray-100' readOnly />
                    </div>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                    <input type="email" defaultValue={currentUser?.email} className='mt-1 p-2 w-full border rounded-md bg-gray-100' readOnly />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Mobile Number</label>
                    <input type="text" defaultValue={currentUser?.mobile} className='mt-1 p-2 w-full border rounded-md bg-gray-100' readOnly />
                </div>

                {/* Nút này có thể kích hoạt chế độ chỉnh sửa sau này */}
                <button type="button" className='mt-6 px-4 py-2 bg-main text-white rounded-md hover:bg-red-700'>
                    Edit Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;