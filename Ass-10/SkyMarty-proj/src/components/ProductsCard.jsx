// src/components/ProductsCard.jsx
import React from "react";
import { Star, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductsCard = ({ product }) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const cartCount = getItemQuantity(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeItem(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#e8e5e0] hover:border-[#6b8f71] hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-56 bg-[#faf8f6] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-44 object-contain transition-transform duration-300 group-hover:scale-105 p-4"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block px-2.5 py-0.5 bg-[#f0f3ee] text-[#6b8f71] text-xs font-medium rounded-full mb-2.5">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 min-h-[40px] group-hover:text-[#6b8f71] transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-[#8a8580] text-xs mt-1.5 line-clamp-2 min-h-[32px]">
          {product.description?.slice(0, 60)}...
        </p>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0ede8]">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-[#f5a623] fill-[#f5a623]" />
            <span className="text-xs font-medium text-[#1a1a1a]">
              {product.rating?.rate || 4.5}
            </span>
            <span className="text-xs text-[#8a8580]">
              ({product.rating?.count || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-[#1a1a1a]">
              ₹{product.price}
            </span>
            {product.price > 500 && (
              <span className="text-[9px] text-[#6b8f71] bg-[#f0f3ee] px-1.5 py-0.5 rounded-full font-medium">
                Premium
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-3 pt-3 border-t border-[#f0ede8]">
          {cartCount > 0 ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRemove}
                  className="w-8 h-8 rounded-lg bg-[#f0f3ee] text-[#4a4642] hover:bg-[#e0dcd7] transition-colors flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium text-[#1a1a1a]">
                  {cartCount}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-8 h-8 rounded-lg bg-[#f0f3ee] text-[#4a4642] hover:bg-[#e0dcd7] transition-colors flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 px-3 py-2 rounded-lg bg-[#6b8f71] text-white text-xs font-medium hover:bg-[#5a7d60] transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={14} />
                Add More
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-full px-4 py-2.5 rounded-lg bg-[#6b8f71] text-white text-sm font-medium hover:bg-[#5a7d60] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;