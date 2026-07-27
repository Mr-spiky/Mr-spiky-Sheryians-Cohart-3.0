import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstance";
import { addToCart } from "../store/cartSlice";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/products/${id}`).then((response) => {
            setProduct(response.data);
            setLoading(false);
        });
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return <p className="text-gray-500 text-center py-32">Loading...</p>;
    }

    return (
        <div className="px-8 py-10 text-white">

            <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
            >
                ← Back
            </button>

            <div className="flex flex-col md:flex-row gap-10 bg-gray-900 border border-gray-800 rounded-2xl p-8">

                {/* Product Image */}
                <div className="bg-white rounded-xl p-6 flex items-center justify-center w-full md:w-72 h-72 flex-shrink-0">
                    <img src={product.image} alt={product.title} className="h-full object-contain" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <p className="text-xs text-indigo-500 uppercase tracking-widest font-medium mb-2">{product.category}</p>
                        <h1 className="text-2xl font-bold text-white mb-4 leading-snug">{product.title}</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <span className="text-3xl font-bold text-white">${product.price}</span>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                    added
                                        ? "bg-green-600 text-white"
                                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                            >
                                {added ? "✓ Added!" : "Add to Cart"}
                            </button>
                            <button
                                onClick={() => { dispatch(addToCart(product)); navigate("/cart"); }}
                                className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;
