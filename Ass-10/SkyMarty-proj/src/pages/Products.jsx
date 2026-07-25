// src/pages/Products.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Search, Grid, List, ChevronDown, ShoppingBag } from 'lucide-react';
import ProductsCard from '../components/ProductsCard';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { totalItems } = useCart();

  // Fetch Products
  const getProductsData = async () => {
    try {
      let res = await axios.get('https://fakestoreapi.com/products');
      setProductsData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("GetProducts Data Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(productsData.map(p => p.category))];

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#6b8f71] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8a8580] text-sm">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] tracking-tight">Shop</h1>
          <p className="text-sm text-[#8a8580]">Discover our curated collection</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Cart Counter */}
          {totalItems > 0 && (
            <div className="flex items-center gap-2 bg-[#6b8f71] text-white px-3 py-1.5 rounded-lg text-sm font-medium">
              <ShoppingBag size={16} />
              <span>{totalItems}</span>
            </div>
          )}
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white border border-[#e8e5e0] rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-[#6b8f71] text-white' : 'text-[#8a8580] hover:text-[#1a1a1a]'
              }`}
            >
              <Grid size={16} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' ? 'bg-[#6b8f71] text-white' : 'text-[#8a8580] hover:text-[#1a1a1a]'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0]">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a8a39e]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#faf8f6] border border-[#e0dcd7] rounded-lg py-2.5 pl-11 pr-4 text-[#1a1a1a] placeholder:text-[#b5b0aa] focus:outline-none focus:ring-2 focus:ring-[#6b8f71] focus:border-transparent transition text-sm"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-[#faf8f6] border border-[#e0dcd7] rounded-lg py-2.5 pl-4 pr-10 text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#6b8f71] focus:border-transparent transition cursor-pointer"
            >
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a8a39e] pointer-events-none" />
          </div>

          <div className="text-sm text-[#8a8580] whitespace-nowrap">
            {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' 
          : 'space-y-4'
        }
      `}>
        {filteredProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 border border-[#e8e5e0] text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-medium text-[#1a1a1a] mb-1">No products found</h3>
          <p className="text-sm text-[#8a8580]">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default Products;