import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { clearCart, removeFromCart } from "../store/cartSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const totalItems = cartItems.reduce((total, item) => total + item.qty, 0);
    const totalValue = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

    // Static user info — in a real app this would come from auth
    const user = {
        name: "Nandani Pande",
        email: "nandani@example.com",
        joined: "July 2025",
    };

    return (
        <div className="px-8 py-14 text-white">

            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-800">
                <div className="w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden flex-shrink-0 shadow-lg">
                    <img src="/ProfilePic.png" alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                    <p className="text-gray-600 text-xs mt-1">Member since {user.joined}</p>
                </div>
            </div>

            {/* Cart Summary — Redux Connected */}
            <div className="mb-10">
                <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-5">Cart Summary</p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                        <p className="text-gray-400 text-xs mb-1">Items in Cart</p>
                        <p className="text-2xl font-bold text-white">{totalItems}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                        <p className="text-gray-400 text-xs mb-1">Cart Value</p>
                        <p className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                        <p className="text-gray-400 text-xs mb-1">Unique Products</p>
                        <p className="text-2xl font-bold text-white">{cartItems.length}</p>
                    </div>
                </div>

                {/* Cart Items List */}
                {cartItems.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                        <p className="text-gray-500 text-sm">No items in your cart.</p>
                        <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm mt-3 inline-block transition-colors">
                            Start Shopping →
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                                <div className="bg-white rounded-lg p-1.5 w-12 h-12 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                                </div>
                                <p className="text-indigo-400 text-sm font-medium">${(item.price * item.qty).toFixed(2)}</p>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-gray-600 hover:text-red-400 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-2">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                            >
                                Clear Cart
                            </button>
                            <Link
                                to="/cart"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                            >
                                View Full Cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Profile;
