// src/pages/public/DetailProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/product";
import { formatPrice, renderRatingStars, validateVariant } from "../../utils/helpers";
import Breadcrumb from "../../components/Breadcrumb";
import {
  FaShieldAlt,
  FaShippingFast,
  FaGift,
  FaUndo,
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext"; // ✅ import giỏ hàng

const DetailProduct = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  // lưu biến thể đã chọn
  const [selectedVariants, setSelectedVariants] = useState({});

  // ✅ giỏ hàng
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(pid);
        if (response?.data?.success) {
          const data = response.data.productData;

          // ✅ Xử lý ảnh fallback an toàn
          const flatImages = Array.isArray(data.images?.[0])
            ? data.images[0]
            : data.images || [];

          const allImgs =
            flatImages?.length > 0
              ? flatImages.includes(data.thumb)
                ? flatImages
                : [data.thumb, ...flatImages]
              : [data.thumb];

          setProduct({ ...data, allImages: allImgs });
          setMainImage(allImgs[0]);
        }
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      }
    };

    if (pid) fetchProduct();
  }, [pid]);

  const handleQuantity = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleVariantSelect = (label, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  // ✅ thêm vào giỏ hàng
  const handleAddToCart = () => {
    if (!product) return;

    addToCart(
      {
        _id: product._id,
        title: product.title,
        price: product.price,
        thumb: product.thumb,
      },
      quantity,
      selectedVariants
    );
  };
  const isVariantSelected =
  !product?.variants || // nếu sp không có variants thì cho phép luôn
  product.variants.every((v) => selectedVariants[v.label]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="w-main mx-auto my-8">
      {/* --- Breadcrumb --- */}
      <div className="text-black mb-6">
        <Breadcrumb product={product} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* --- Cột trái: Hình ảnh --- */}
        <div className="md:col-span-4">
          <div className="border rounded-md">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="relative mt-4">
            <button
              onClick={() => {
                const container = document.getElementById("thumbs-container");
                if (container) container.scrollLeft -= 120;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ◀
            </button>

            <div
              id="thumbs-container"
              className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
            >
              {product.allImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border rounded p-1 flex-shrink-0 ${
                    mainImage === img ? "border-main" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const container = document.getElementById("thumbs-container");
                if (container) container.scrollLeft += 120;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full z-10"
            >
              ▶
            </button>
          </div>
        </div>

        {/* --- Cột giữa: Thông tin sản phẩm --- */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {/* Hiển thị badge biến thể đã chọn */}
          {Object.keys(selectedVariants).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.entries(selectedVariants).map(([label, value]) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-700"
                >
                  {label}:{" "}
                  <span className="font-semibold text-main">{value}</span>
                </span>
              ))}
            </div>
          )}

          {/* Giá + Kho */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-3xl font-bold text-main">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Rating + Sold */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <div className="flex items-center text-yellow-400">
              {renderRatingStars(product.totalRating)}
            </div>
            <span className="text-gray-600 italic">(Sold: {product.sold})</span>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
            {product.description
              ?.filter((line) => !line.toLowerCase().startsWith("thumbnail:"))
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>

          {/* Variants chọn */}
          {product.variants?.map((v) => (
            <div key={v.label} className="mb-4">
              <span className="font-semibold">{v.label}</span>
              <div className="flex gap-2 mt-2">
                {v.variants.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleVariantSelect(v.label, option)}
                    className={`px-4 py-1 border rounded ${
                      selectedVariants[v.label] === option
                        ? "border-main bg-main text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantity("decrease")}
                className="p-3"
              >
                <FaMinus size={12} />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantity("increase")}
                className="p-3"
              >
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* ✅ Add to cart */}
<button
  onClick={handleAddToCart}
  disabled={!isVariantSelected}
  className={`w-full font-bold py-3 rounded-md transition-colors ${
    isVariantSelected
      ? "bg-main text-white hover:bg-red-700"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  ADD TO CART
</button>

{/* {!isVariantSelected && product?.variants?.length > 0 && (
  <p className="mt-2 text-sm text-red-500">
    Please select all variations before adding to cart
  </p>
)} */}

          <div className="flex gap-2 mt-4">
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="p-3 bg-gray-800 text-white rounded-full">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* --- Cột phải: Chính sách --- */}
        <div className="md:col-span-3">
          <div className="space-y-4">
            <PolicyItem
              icon={<FaShieldAlt />}
              title="Guarantee"
              subtitle="Quality Checked"
            />
            <PolicyItem
              icon={<FaShippingFast />}
              title="Free Shipping"
              subtitle="Free On All Products"
            />
            <PolicyItem
              icon={<FaGift />}
              title="Special Gift Cards"
              subtitle="Special Gift Cards"
            />
            <PolicyItem
              icon={<FaUndo />}
              title="Free Return"
              subtitle="Within 7 Days"
            />
            <PolicyItem
              icon={<FaHeadset />}
              title="Consultancy"
              subtitle="Lifetime 24/7/356"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component con cho các mục chính sách
const PolicyItem = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 p-4 border rounded-md">
    <span className="text-2xl text-gray-500">{icon}</span>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </div>
);

export default DetailProduct;
