import React, { useState, useEffect } from 'react';
import { getApiCategories } from '../apis/app'; // Đảm bảo đường dẫn này đúng

const Sidebar = () => {
  useEffect(() => {
    // Định nghĩa và gọi hàm ngay bên trong useEffect
    const fetchCategories = async () => {
      const response = await getApiCategories();
      console.log(response);
    };

    fetchCategories();
  }, []); // Mảng phụ thuộc rỗng đảm bảo useEffect chỉ chạy một lần sau khi component được mount

  return (
    <div>
      sidebar
    </div>
  );
};

export default Sidebar;