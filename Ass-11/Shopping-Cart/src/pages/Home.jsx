import React, { useEffect, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import axiosInstance from "../config/axiosInstance";
import { addToCart } from "../store/cartSlice";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
});

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
};

// Renders star rating without emojis
const StarRating = ({ rate }) => {
    const full = Math.round(rate);
    return (
        <div className="flex items-center gap-1">
            <div className="flex text-yellow-400 text-xs tracking-tight">
                {"★".repeat(full)}
                <span className="text-gray-600">{"★".repeat(5 - full)}</span>
            </div>
            <span className="text-gray-500 text-xs">{rate.toFixed(1)}</span>
        </div>
    );
};

const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

const Home = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const cartItemCount = cartItems.reduce((t, i) => t + i.qty, 0);
    const cartValue = cartItems.reduce((t, i) => t + i.price * i.qty, 0);

    useEffect(() => {
        dispatch(fetchProducts()).then((action) => {
            setProducts(action.payload || []);
            setLoading(false);
        });
    }, []);

    const filtered = products
        .filter((p) => activeCategory === "all" || p.category === activeCategory)
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

    const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4);
    const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 4);

    if (loading) {
        return <p className="text-gray-500 text-center py-32">Loading...</p>;
    }

    return (
        <div className="text-white">

            {/* ── Greeting Bar ── */}
            <div className="px-8 py-3 border-b border-gray-800 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {getGreeting()}, <span className="text-white font-medium">Nandani</span> — Here are today's top picks
                </p>
                <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>{products.length} Products</span>
                    <span>•</span>
                    <span>{cartItemCount} in Cart</span>
                    <span>•</span>
                    <span className="text-indigo-400">${cartValue.toFixed(2)} value</span>
                </div>
            </div>

            {/* ── Hero Banner ── */}
            <div 
                className="mx-8 mt-6 mb-6 border border-gray-800 rounded-2xl overflow-hidden relative bg-cover bg-center"
                style={{ backgroundImage: 'url("/banner-1.png")' }}
            >
                <div className="absolute inset-0 bg-gray-900/40 md:bg-gradient-to-r md:from-gray-900/80 md:via-gray-900/10 md:to-transparent"></div>
                <div className="relative flex items-center justify-between px-10 py-10 z-10">
                    <div className="max-w-lg">
                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Limited Time Offer</p>
                        <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                            Top Brands. <br />Best Prices.
                        </h1>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Shop across Electronics, Fashion, Accessories and more — curated from top brands at unbeatable prices.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveCategory("electronics")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
                            >
                                Shop Electronics
                            </button>
                            <button
                                onClick={() => setActiveCategory("women's clothing")}
                                className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                            >
                                Shop Fashion
                            </button>
                        </div>
                    </div>

                    {/* Right side stat block */}
                    <div className="hidden lg:grid grid-cols-2 gap-3">
                        {[
                            { value: `${products.length}+`, label: "Products" },
                            { value: `${Object.keys(products.reduce((a, p) => ({ ...a, [p.category]: 1 }), {})).length}`, label: "Categories" },
                            { value: `${products.filter(p => p.rating.rate >= 4).length}`, label: "Top Rated" },
                            { value: "Free", label: "Delivery" },
                        ].map((s) => (
                            <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-white">{s.value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Category + Search Row ── */}
            <div className="px-8 mb-5 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors ${
                                activeCategory === cat
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                            }`}
                        >
                            {cat === "all" ? "All Products" : cat}
                        </button>
                    ))}
                </div>

                {/* Search in content area */}
                <div className="ml-auto flex items-center gap-2">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-52 transition-colors"
                        />
                    </div>
                    <span className="text-xs text-gray-600">{filtered.length} results</span>
                </div>
            </div>

            {/* ── Product Grid ── */}
            <div className="px-8 mb-8">
                {filtered.length === 0 ? (
                    <p className="text-gray-500 text-center py-16">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filtered.map((product) => (
                            <div
                                key={product.id}
                                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-colors flex flex-col group"
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="bg-white h-44 flex items-center justify-center p-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs text-gray-500 capitalize mb-1">{product.category}</p>
                                        <h3 className="text-xs font-medium text-white line-clamp-2 mb-2 leading-relaxed">{product.title}</h3>
                                        <StarRating rate={product.rating.rate} />
                                    </div>
                                </Link>
                                <div className="px-3 pb-3 mt-auto flex items-center justify-between">
                                    <p className="text-white font-bold">${product.price}</p>
                                    <button
                                        onClick={() => dispatch(addToCart(product))}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Best Sellers + New Arrivals ── */}
            <div className="px-8 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Best Sellers */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-white">Best Sellers</h2>
                        <span className="text-xs text-gray-500">By rating</span>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-800">
                        {topRated.map((p, idx) => (
                            <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity">
                                <span className="text-gray-600 text-xs font-medium w-4">{idx + 1}</span>
                                <div className="bg-white rounded-lg p-1.5 w-10 h-10 flex-shrink-0">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-white truncate mb-0.5">{p.title}</p>
                                    <StarRating rate={p.rating.rate} />
                                </div>
                                <p className="text-indigo-400 text-xs font-semibold flex-shrink-0">${p.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* New Arrivals */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-white">New Arrivals</h2>
                        <span className="text-xs text-gray-500">Latest products</span>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-800">
                        {newArrivals.map((p, idx) => (
                            <div key={p.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                <Link to={`/product/${p.id}`} className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity">
                                    <div className="bg-white rounded-lg p-1.5 w-10 h-10 flex-shrink-0">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-white truncate">{p.title}</p>
                                        <p className="text-indigo-400 text-xs font-medium mt-0.5">${p.price}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => dispatch(addToCart(p))}
                                    className="flex-shrink-0 w-7 h-7 border border-gray-700 hover:border-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Feature Strip ── */}
            <div className="px-8 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    {
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />,
                        title: "Fast Delivery",
                        sub: "Same-day on select items"
                    },
                    {
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                        title: "Secure Payments",
                        sub: "100% encrypted checkout"
                    },
                    {
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />,
                        title: "Best Prices",
                        sub: "Price match guarantee"
                    },
                ].map((f) => (
                    <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {f.icon}
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{f.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{f.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
