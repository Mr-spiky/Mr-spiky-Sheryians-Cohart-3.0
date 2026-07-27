import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { removeFromCart, increaseQty, decreaseQty } from "../store/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center text-white">
                <p className="text-4xl mb-4">🛒</p>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 text-sm mb-6">Add some products to get started</p>
                <Link
                    to="/"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="px-8 py-10 text-white">
            <h1 className="text-2xl font-bold mb-8">Your Cart <span className="text-gray-500 text-lg font-normal">({totalItems} items)</span></h1>

            {/* Cart Items */}
            <div className="flex flex-col gap-3 mb-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-5">

                        {/* Image */}
                        <div className="bg-white rounded-lg p-2 w-16 h-16 flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                        </div>

                        {/* Title + Price */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.title}</p>
                            <p className="text-indigo-400 text-sm mt-0.5">${item.price}</p>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => dispatch(decreaseQty(item.id))}
                                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-md text-sm transition-colors"
                            >
                                −
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                            <button
                                onClick={() => dispatch(increaseQty(item.id))}
                                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-md text-sm transition-colors"
                            >
                                +
                            </button>
                        </div>

                        {/* Item Total */}
                        <p className="text-white font-semibold w-20 text-right text-sm">
                            ${(item.price * item.qty).toFixed(2)}
                        </p>

                        {/* Remove */}
                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-gray-600 hover:text-red-400 transition-colors ml-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">Order Total</p>
                    <p className="text-2xl font-bold text-white mt-1">${totalPrice.toFixed(2)}</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3 rounded-lg transition-colors">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
