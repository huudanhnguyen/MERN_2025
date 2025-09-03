// // src/components/NewArrivals.jsx




// // src/components/NewArrivals.jsx

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getAllProducts } from "../apis/product";
import Product from "./Product";
import QuickViewModal from "./QuickViewModal";
import { getApiCategories } from "../apis/categoryProduct";

const NewArrivals = () => {
  const [products, setProducts] = useState(null);

  // 2. LẤY categories TRỰC TIẾP TỪ REDUX STORE
  const { categories } = useSelector((state) => state.app);
  const [activeCategory, setActiveCategory] = useState(null);

  // State cho Quick View Modal (giữ nguyên)
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const sliderRef = useRef();

  useEffect(() => {
    // Định nghĩa các danh mục muốn hiển thị, bằng chữ thường để so sánh đáng tin cậy.
    const desiredCategoryTitles = ["smartphone", "tablet", "laptop"];

    const fetchCategories = async () => {
      try {
        const response = await getApiCategories();
        if (response?.data?.success) {
          const allCategoriesFromApi = response.data.categories;

          // LOGIC LỌC AN TOÀN VÀ MẠNH MẼ HƠN
          const filteredCategories = allCategoriesFromApi.filter((category) => {
            // 1. Kiểm tra xem category và title có tồn tại không để tránh lỗi
            if (!category || !category.title) {
              return false;
            }

            // 2. Cắt bỏ khoảng trắng thừa và chuyển về chữ thường trước khi so sánh
            const categoryTitle = category.title.trim().toLowerCase();
            return desiredCategoryTitles.includes(categoryTitle);
          });

          // Cập nhật state bằng danh sách đã lọc
          setCategories(filteredCategories);

          // Đặt danh mục active mặc định là phần tử đầu tiên của danh sách ĐÃ LỌC
          if (filteredCategories.length > 0) {
            setActiveCategory(filteredCategories[0]);
          }
          // 1. TẠO "DANH MỤC ẢO" CHO TAB 'ALL'
          const allTab = { _id: "all", title: "All" };
          // Thêm tab "All" vào đầu danh sách đã lọc
          const finalCategories = [allTab, ...filteredCategories];

          setCategories(finalCategories);

          // Mặc định chọn tab "All"
          setActiveCategory(allTab);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []); // Dependency rỗng `[]` đảm bảo chỉ chạy 1 lần

  // 4. SỬA LẠI LOGIC LẤY SẢN PHẨM
  // useEffect này sẽ chạy mỗi khi `activeCategory` thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      if (activeCategory) {
        try {
          // 2. TẠO PARAMS ĐỂ GỌI API
          let params = { limit: 10 };

          // Nếu không phải tab "All", thì thêm tham số category
          if (activeCategory._id !== "all") {
            params.category = activeCategory.title;
          } else {
            // Nếu là tab "All", thì sort theo sản phẩm mới nhất
            params.sort = "-createdAt";
          }

          const response = await getAllProducts(params);

          if (response?.data?.success) {
            setProducts(response.data.products);
          } else {
            setProducts([]);
          }
        } catch (error) {
          console.error(
            `Failed to fetch products for category ${activeCategory.title}:`,
            error
          );
          setProducts([]);
        }
      }
    };
    fetchProducts();
  }, [activeCategory]); // Phụ thuộc vào activeCategory

  // Các hàm để điều khiển modal (giữ nguyên)
  const handleQuickView = (product) => {
    setModalData(product);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  // Hàm quyết định nhãn sản phẩm (giữ nguyên)
  const getProductLabel = (product) => {
    if (!product) return null;
    if (product.sold > 20) return "TRENDING";
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (new Date(product.createdAt) > sevenDaysAgo) return "NEW";
    return null;
  };

  // Cài đặt cho slider (sửa lại `infinite` để dùng state mới)
  const sliderSettings = {
    dots: false,
    infinite: products?.length > 4,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      {/* 5. SỬA LẠI PHẦN TIÊU ĐỀ ĐỂ CÓ TABS */}
      <div className="flex justify-between items-center py-4 border-b-2 border-main">
        <h3 className="text-xl font-semibold uppercase">NEW ARRIVALS</h3>
        <div className="flex items-center gap-4 text text-gray-500">
          {categories?.map((cat) => (
            <span
              key={cat._id}
              className={`cursor-pointer hover:text-main ${
                activeCategory?._id === cat._id
                  ? "text-[20px] font-semibold"
                  : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.title}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 mx-[-10px] relative custom-slick">
        {products && products.length > 0 ? (
          <Slider ref={sliderRef} {...sliderSettings}>
            {products.map(
              (
                product // Không cần `?.` ở đây nữa
              ) => (
                <div key={product._id} className="px-2">
                  <Product
                    productData={product}
                    label={getProductLabel(product)}
                    onQuickView={handleQuickView}
                  />
                </div>
              )
            )}
          </Slider>
        ) : (
          // Hiển thị một thông báo nếu không có sản phẩm hoặc đang tải
          <div className="p-4 text-center text-gray-500">
            {products
              ? "No products found in this category."
              : "Loading products..."}
          </div>
        )}

        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="custom-banner-slick slick-prev"
        >
          &lt;
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="custom-banner-slick slick-next"
        >
          &gt;
        </button>
      </div>

      {/* Render Modal qua Portal (giữ nguyên) */}
      {showModal &&
        modalData &&
        ReactDOM.createPortal(
          <QuickViewModal product={modalData} onClose={handleCloseModal} />,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

export default NewArrivals;



