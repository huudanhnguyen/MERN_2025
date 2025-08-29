import React from "react";
import { FaHeart, FaList, FaEye } from "react-icons/fa";
import { formatPrice, renderRatingStars } from "../utils/helpers";
import SelectOptions from "./SelectOptions";

const Product = ({ productData, label, onQuickView }) => {
  if (!productData) return null;

  const imageUrl =
    productData?.thumb ||
    (productData?.images && productData.images.length > 0
      ? productData.images[0]
      : "https://via.placeholder.com/300");

  const productName = productData?.name || productData?.title || "No name";

  const labelColor = label === "TRENDING" ? "bg-blue-500" : "bg-orange-500";
  return (
    <div className="w-full border rounded-md overflow-hidden relative group text-center">
      {/* --- Phần hình ảnh --- */}
      <div className="w-full h-[250px] overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" // Thêm hiệu ứng zoom
        />
      </div>

      {/* --- Phần nhãn (NEW/TRENDING) --- */}
      {label && (
        <div
          className={`absolute top-2 right-[-1px] text-white text-xs font-semibold px-3 py-1 ${labelColor} flex items-center gap-1`}
        >
          <span className="w-2 h-2 bg-white rounded-full"></span>
          {label}
        </div>
      )}

      <SelectOptions onQuickView={onQuickView} productData={productData} />

      {/* --- Phần thông tin sản phẩm --- */}
      <div className="p-4">
        <div className="text-lg font-semibold truncate">{productName}</div>

        <div className="mt-1 text-lg font-semibold text-main">
          {formatPrice(productData?.price)}
          <div className="flex items-center justify-center my-2">
            {renderRatingStars(productData?.totalRating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
