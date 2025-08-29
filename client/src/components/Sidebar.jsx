import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// 1. Import action `fetchCategories` từ file asyncActions của bạn
import { fetchCategories } from '../store/asyncActions'; 
// 2. Import hàm tiện ích createSlug
import { createSlug } from '../utils/helpers'; // <-- Đảm bảo đường dẫn này đúng

const Sidebar = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector(state => state.app);
    useEffect(() => {
        // Gửi action đi để Redux bắt đầu quá trình gọi API
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className='flex flex-col border'>
            {loading && <div>Loading categories...</div>}
            {!loading && categories?.map((el) => (
                <NavLink
                    key={el._id} 
                    to={`/${createSlug(el.title)}`}
                    className={({ isActive }) => 
                        isActive 
                        ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm' 
                        : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;