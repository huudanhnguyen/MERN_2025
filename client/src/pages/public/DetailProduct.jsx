// src/pages/public/DetailProduct.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/product";
import { formatPrice, renderRatingStars } from "../../utils/helpers";
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

const DetailProduct = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(pid);
      if (response?.data?.success) {
        const data = response.data.productData;

        const flatImages = Array.isArray(data.images?.[0])
          ? data.images[0]
          : data.images || [];

        const allImgs = flatImages.includes(data.thumb)
          ? flatImages
          : [data.thumb, ...flatImages];

        setProduct({ ...data, allImages: allImgs });
        setMainImage(allImgs[0]);
      }
    } catch (error) {
      console.error("Lỗi fetch sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (pid) fetchProduct();
  }, [pid]);

  const handleQuantity = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

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
                container.scrollLeft -= 120;
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
                container.scrollLeft += 120;
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

          {/* Giá + Kho */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-3xl font-bold text-main">
              {formatPrice(product.price)} <span className="text-lg"></span>
            </p>
          </div>

          {/* Rating + Sold */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <div className="flex items-center text-yellow-400">
              {renderRatingStars(product.totalRating)}
            </div>
            <span className="text-gray-600 italic">
              (Sold: {product.sold})
            </span>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
            {product.description
              ?.filter(
                (line) => !line.toLowerCase().startsWith("thumbnail:")
              )
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>

          {/* Color & Quantity */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-semibold">Color</span>
            <div className="flex gap-2">
              <button className="border-2 border-main px-4 py-1 rounded">
                GOLD
              </button>
              <button className="border px-4 py-1 rounded">GRAY</button>
            </div>
          </div>
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

          <button className="w-full bg-main text-white font-bold py-3 rounded-md hover:bg-red-700 transition-colors">
            ADD TO CART
          </button>

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
