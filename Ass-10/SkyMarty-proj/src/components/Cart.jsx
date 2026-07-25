// src/pages/Cart.jsx
import React from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

const Cart = () => {
  const { 
    cart, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  // Update quantity handler
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Remove item handler
  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  // Clear cart handler
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Checkout handler
  const handleCheckout = () => {
    // Navigate to checkout page or show modal
    alert('Proceeding to checkout...');
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#f0f3ee] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={40} className="text-[#8a8580]" />
          </div>
          <h2 className="text-2xl font-medium text-[#1a1a1a] mb-2">Your cart is empty</h2>
          <p className="text-[#8a8580] text-sm mb-6">Looks like you haven't added any items yet</p>
          <button
            onClick={() => navigate('/main/products')}
            className="px-6 py-2.5 bg-[#6b8f71] text-white text-sm font-medium rounded-lg hover:bg-[#5a7d60] transition-colors flex items-center gap-2 mx-auto"
          >
            Start Shopping
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-[#8a8580]">{totalItems} items in your cart</p>
        </div>
        <button
          onClick={handleClearCart}
          className="flex items-center gap-2 px-4 py-2 text-sm text-[#c45a5a] hover:text-[#a84a4a] transition-colors"
        >
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="col-span-2 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl p-5 border border-[#e8e5e0] hover:border-[#6b8f71] transition-colors"
            >
              <div className="flex gap-5">
                {/* Product Image */}
                <div className="w-24 h-24 bg-[#faf8f6] rounded-xl flex items-center justify-center flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="h-20 object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-[#f0f3ee] text-[#6b8f71] text-xs font-medium rounded-full mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#8a8580] mt-0.5 line-clamp-1">
                        {item.description?.slice(0, 50)}...
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-[#8a8580] hover:text-[#c45a5a] transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0ede8]">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-[#f0f3ee] text-[#4a4642] hover:bg-[#e0dcd7] transition-colors flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[#1a1a1a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-[#f0f3ee] text-[#4a4642] hover:bg-[#e0dcd7] transition-colors flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-base font-semibold text-[#1a1a1a]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="text-xs text-[#8a8580]">
                        ₹{item.price} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e5e0] sticky top-6">
            <h3 className="text-lg font-medium text-[#1a1a1a] mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#8a8580]">Subtotal ({totalItems} items)</span>
                <span className="text-[#1a1a1a] font-medium">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-[#8a8580]">Delivery</span>
                <span className="text-[#6b8f71] font-medium">Free</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-[#8a8580]">Tax</span>
                <span className="text-[#1a1a1a] font-medium">₹{(totalPrice * 0.18).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-[#e8e5e0] pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-[#1a1a1a]">Total</span>
                  <span className="text-xl font-bold text-[#6b8f71]">
                    ₹{(totalPrice + totalPrice * 0.18).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 py-3 bg-[#6b8f71] text-white rounded-lg font-medium hover:bg-[#5a7d60] transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Proceed to Checkout
              </button>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-[#f0ede8] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#8a8580]">
                  <Truck size={14} />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8a8580]">
                  <Shield size={14} />
                  <span>Secure checkout with 100% encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;