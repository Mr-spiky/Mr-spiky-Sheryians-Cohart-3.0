import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Package, 
  Truck, 
  Shield, 
  Tag,
  ChevronRight,
  ShoppingBag,
  Star,
  Clock,
  TrendingUp,
  Zap
} from 'lucide-react';

const Home = () => {
  // Featured categories with icons
  const categories = [
    { name: 'Electronics', items: 17, icon: '💻', color: 'bg-blue-50' },
    { name: 'Clothing', items: 2, icon: '👕', color: 'bg-pink-50' },
    { name: 'Furniture', items: 3, icon: '🪑', color: 'bg-amber-50' },
    { name: 'Home', items: 14, icon: '🏠', color: 'bg-green-50' },
    { name: 'Sports', items: 8, icon: '⚽', color: 'bg-orange-50' },
    { name: 'Accessories', items: 6, icon: '⌚', color: 'bg-purple-50' },
  ];

  // Featured products (will be replaced with real data)
  const featuredProducts = [
    { name: 'Wireless Headphones', price: 599.99, rating: 4.8, reviews: 234, image: '🎧' },
    { name: 'Smart Watch Series 5', price: 199.99, rating: 4.6, reviews: 189, image: '⌚' },
    { name: 'Premium Backpack', price: 349.99, rating: 4.9, reviews: 312, image: '🎒' },
    { name: 'LED Desk Lamp', price: 149.99, rating: 4.7, reviews: 156, image: '💡' },
  ];

  const newArrivals = [
    { name: 'USB-C Hub Pro', price: 599.99, rating: 4.4, image: '🔌' },
    { name: 'Bluetooth Speaker X', price: 199.99, rating: 4.7, image: '🔊' },
    { name: 'Phone Stand Flex', price: 349.99, rating: 4.3, image: '📱' },
    { name: 'Wireless Mouse M2', price: 49.99, rating: 4.8, image: '🖱️' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-white rounded-2xl p-8 border border-[#e8e5e0] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6b8f71]/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6b8f71]/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#f0f3ee] px-4 py-1.5 rounded-full text-sm text-[#6b8f71] font-medium mb-4">
              <Sparkles size={16} />
              GOOD EVENING 🌙
            </div>
            <h2 className="text-3xl font-semibold text-[#1a1a1a] tracking-tight mb-2">
              Welcome back, spiky!
            </h2>
            <p className="text-[#8a8580] text-sm max-w-xl leading-relaxed">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <button className="px-6 py-2.5 bg-[#6b8f71] text-white text-sm font-medium rounded-lg hover:bg-[#5a7d60] transition-colors shadow-sm shadow-[#6b8f71]/20">
                Shop Now
              </button>
              <button className="px-6 py-2.5 border border-[#e0dcd7] text-[#4a4642] text-sm font-medium rounded-lg hover:bg-[#f5f3f0] transition-colors flex items-center gap-2">
                View All Products
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-10 pl-8">
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#1a1a1a]">20+</div>
              <div className="text-xs text-[#8a8580] mt-1">Products Available</div>
            </div>
            <div className="w-px h-12 bg-[#e8e5e0]"></div>
            <div className="text-center">
              <div className="text-3xl font-semibold text-[#6b8f71]">Free</div>
              <div className="text-xs text-[#8a8580] mt-1">Delivery on ₹999+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <ShoppingBag size={22} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#8a8580] uppercase tracking-wider">Cart Items</div>
            <div className="text-base font-semibold text-[#1a1a1a]">3 in your bag</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <Package size={22} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#8a8580] uppercase tracking-wider">Cart Value</div>
            <div className="text-base font-semibold text-[#1a1a1a]">₹1,249.00</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <TrendingUp size={22} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#8a8580] uppercase tracking-wider">Top Products</div>
            <div className="text-base font-semibold text-[#1a1a1a]">Highly rated</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <Zap size={22} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-xs font-medium text-[#8a8580] uppercase tracking-wider">Categories</div>
            <div className="text-base font-semibold text-[#1a1a1a]">To explore</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-8 border border-[#e8e5e0]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-[#1a1a1a]">Shop by Category</h3>
          <button className="text-sm text-[#6b8f71] font-medium hover:text-[#5a7d60] transition-colors flex items-center gap-1">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category, idx) => (
            <div 
              key={idx}
              className={`${category.color} border border-[#e8e5e0] rounded-xl p-5 text-center hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
              <div className="text-sm font-medium text-[#1a1a1a]">{category.name}</div>
              <div className="text-xs text-[#8a8580] mt-0.5">{category.items} items</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white rounded-2xl p-8 border border-[#e8e5e0]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium text-[#1a1a1a]">Featured Products</h3>
            <p className="text-xs text-[#8a8580]">Hand-picked just for you</p>
          </div>
          <button className="text-sm text-[#6b8f71] font-medium hover:text-[#5a7d60] transition-colors flex items-center gap-1">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {featuredProducts.map((product, idx) => (
            <div key={idx} className="border border-[#e8e5e0] rounded-xl p-4 hover:border-[#6b8f71] hover:shadow-sm transition-all cursor-pointer group">
              <div className="text-4xl text-center mb-3 group-hover:scale-110 transition-transform"> {product.image} </div>
              <div className="text-sm font-medium text-[#1a1a1a] truncate">{product.name}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-semibold text-[#6b8f71]">₹{product.price}</span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-[#f5a623] fill-[#f5a623]" />
                  <span className="text-xs text-[#8a8580]">{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated & New Arrivals */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Rated */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e5e0]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-[#1a1a1a]">Top Rated</h3>
              <p className="text-xs text-[#8a8580]">Highly rated by customers</p>
            </div>
            <button className="text-sm text-[#6b8f71] font-medium hover:text-[#5a7d60] transition-colors flex items-center gap-1">
              See all
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {featuredProducts.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2.5 border-b border-[#f0ede8] last:border-0 hover:bg-[#faf8f6] -mx-2 px-2 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <span className="text-sm text-[#4a4642]">{item.name}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={12} className="text-[#f5a623] fill-[#f5a623]" />
                      <span className="text-xs text-[#8a8580]">{item.rating} ({item.reviews || 100})</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#1a1a1a]">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e5e0]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-[#1a1a1a]">New Arrivals</h3>
              <p className="text-xs text-[#8a8580]">Fresh products to explore</p>
            </div>
            <button className="text-sm text-[#6b8f71] font-medium hover:text-[#5a7d60] transition-colors flex items-center gap-1">
              See all
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {newArrivals.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2.5 border-b border-[#f0ede8] last:border-0 hover:bg-[#faf8f6] -mx-2 px-2 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <span className="text-sm text-[#4a4642]">{item.name}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock size={12} className="text-[#6b8f71]" />
                      <span className="text-xs text-[#8a8580]">Just arrived</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#1a1a1a]">₹{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors">
          <div className="w-11 h-11 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <Truck size={20} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#1a1a1a]">Fast Delivery</div>
            <div className="text-xs text-[#8a8580]">Same-day on select items</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors">
          <div className="w-11 h-11 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#1a1a1a]">Secure Payments</div>
            <div className="text-xs text-[#8a8580]">100% encrypted checkout</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e8e5e0] flex items-center gap-4 hover:border-[#6b8f71] transition-colors">
          <div className="w-11 h-11 rounded-xl bg-[#f0f3ee] flex items-center justify-center flex-shrink-0">
            <Tag size={20} className="text-[#6b8f71]" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#1a1a1a]">Best Prices</div>
            <div className="text-xs text-[#8a8580]">Price-match guarantee</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white rounded-2xl p-6 border border-[#e8e5e0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package size={18} className="text-[#6b8f71]" />
            <span className="text-base font-medium text-[#1a1a1a]">SkyMart</span>
          </div>
          <div className="text-xs text-[#8a8580]">
            © 2025 SkyMart • Built with React • Redux • TanStack Query
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;