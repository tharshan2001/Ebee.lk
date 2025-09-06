import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faTruck } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

// Expanded mock product data with appliance-focused schema
const mockProducts = [
  {
    id: 101,
    name: '42" Smart 4K LED TV',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    category: 'TVs',
    subcategory: 'Smart TVs',
    brand: 'Vista',
    features: ['4K', 'Smart', 'HDR'],
    energyRating: 'A+',
    dimensions: { w: 95, h: 55, d: 8 },
    image: 'https://images.unsplash.com/photo-1585386959984-a415522e3f49?w=600&h=400&fit=crop&crop=center',
    rating: 4.6,
    isNew: true,
    isTrending: true
  },
  {
    id: 102,
    name: '320L Frost Free Refrigerator',
    price: 599.99,
    originalPrice: 749.99,
    discount: 20,
    category: 'Refrigerators',
    subcategory: 'Frost Free',
    brand: 'CoolPro',
    features: ['Inverter', 'Frost Free', 'Stainless Steel'],
    energyRating: 'A++',
    dimensions: { w: 70, h: 180, d: 65 },
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e6a9?w=600&h=400&fit=crop&crop=center',
    rating: 4.5,
    isNew: false,
    isTrending: true
  },
  {
    id: 103,
    name: '2-Seater Leather Sofa',
    price: 399.99,
    originalPrice: null,
    discount: 0,
    category: 'Sofas & Chairs',
    subcategory: 'Sofas',
    brand: 'HomeCraft',
    features: ['Leather', '2-Seater'],
    energyRating: null,
    dimensions: { w: 160, h: 85, d: 90 },
    image: 'https://images.unsplash.com/photo-1616628189071-7b5d6f3b2c4a?w=600&h=400&fit=crop&crop=center',
    rating: 4.2,
    isNew: true,
    isTrending: false
  },
  {
    id: 104,
    name: 'Ceramic Hair Dryer 1800W',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: 'Small Appliances',
    subcategory: 'Hair Care',
    brand: 'GlamWave',
    features: ['1800W', 'Ceramic', 'Cool Shot'],
    energyRating: null,
    dimensions: { w: 20, h: 25, d: 8 },
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600&h=400&fit=crop&crop=center',
    rating: 4.4,
    isNew: false,
    isTrending: true
  },
  {
    id: 105,
    name: 'Portable Bluetooth Subwoofer',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    category: 'Audio',
    subcategory: 'Subwoofers',
    brand: 'BassBlast',
    features: ['Bluetooth', 'Portable', 'USB'],
    energyRating: null,
    dimensions: { w: 30, h: 30, d: 30 },
    image: 'https://images.unsplash.com/photo-1518444022004-1c7adf0c6b3a?w=600&h=400&fit=crop&crop=center',
    rating: 4.1,
    isNew: false,
    isTrending: false
  },
  {
    id: 106,
    name: '55" OLED Smart TV',
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    category: 'TVs',
    subcategory: 'OLED',
    brand: 'Vista',
    features: ['OLED', 'Smart', 'HDR', '4K'],
    energyRating: 'A',
    dimensions: { w: 123, h: 72, d: 7 },
    image: 'https://images.unsplash.com/photo-1504945005722-6d5f6bde4f20?w=600&h=400&fit=crop&crop=center',
    rating: 4.8,
    isNew: true,
    isTrending: true
  },
  {
    id: 107,
    name: 'Top-load Washing Machine 8kg',
    price: 349.99,
    originalPrice: 449.99,
    discount: 22,
    category: 'Small Appliances',
    subcategory: 'Washing Machines',
    brand: 'WashPro',
    features: ['8kg', 'Top Load', 'Quick Wash'],
    energyRating: 'B',
    dimensions: { w: 60, h: 95, d: 60 },
    image: 'https://images.unsplash.com/photo-1581578732320-73f4e4f3a9c6?w=600&h=400&fit=crop&crop=center',
    rating: 4.3,
    isNew: false,
    isTrending: false
  },
  {
    id: 108,
    name: 'Mini Fridge 50L',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    category: 'Refrigerators',
    subcategory: 'Mini Fridge',
    brand: 'CoolMate',
    features: ['Compact', 'Energy Saving'],
    energyRating: 'A',
    dimensions: { w: 45, h: 50, d: 45 },
    image: 'https://images.unsplash.com/photo-1572423056021-3d3d7a8a2f6b?w=600&h=400&fit=crop&crop=center',
    rating: 3.9,
    isNew: false,
    isTrending: true
  }
];

// Hero carousel images - using actual banner images from assets
const heroImages = [
  {
    id: 1,
    image: banner1
  },
  {
    id: 2,
    image: banner2
  },
  {
    id: 3,
    image: banner3
  }
];

// Debug: Log the imported images
console.log('Banner imports:', { banner1, banner2, banner3 });
console.log('Hero images:', heroImages);


const sortOptions = ["New Arrivals", "Price: Low to High", "Price: High to Low", "Rating"];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("New Arrivals");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Derived filter lists
  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];
  const allBrands = Array.from(new Set(mockProducts.map(p => p.brand).filter(Boolean)));


  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = mockProducts.filter(product => {
      // Category / Subcategory
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const subcategoryMatch = selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory);

      // Price
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Brands
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return categoryMatch && subcategoryMatch && priceMatch && brandMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Rating':
          return b.rating - a.rating;
        case 'New Arrivals':
        default:
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategories, selectedBrands, sortBy, priceRange]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
      navigate(`/product/${product.id}`);
    };

    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-black text-yellow-400 px-2 py-1 rounded-full text-sm font-bold">
              NEW
            </span>
          )}
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-yellow-400 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">LKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">LKR {product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    );
  };

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
      <div className={`${isMobile ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform' : 'bg-white rounded-xl shadow-lg p-6'}`}>
        {isMobile && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-black">Filters</h3>
            <button onClick={() => setShowMobileFilters(false)} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        )}
        
        <div className={`${isMobile ? 'p-6' : ''}`}>
          {!isMobile && <h3 className="text-lg font-semibold mb-4 text-black">Filters</h3>}
          
          {/* Categories & Subcategories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-black">Category</h4>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategories([]); }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white hover:border-yellow-300 transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Subcategory checkboxes (when a category is selected) */}
            {selectedCategory !== 'All' && (
              <div className="mt-4 space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Subcategories</h5>
                {Array.from(new Set(mockProducts.filter(p => p.category === selectedCategory).map(p => p.subcategory))).map(sub => (
                  <label key={sub} className="flex items-center hover:bg-yellow-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedSubcategories(prev => [...prev, sub]);
                        else setSelectedSubcategories(prev => prev.filter(s => s !== sub));
                      }}
                      className="text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium">{sub}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-black">Price Range</h4>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-yellow-400"
                style={{
                  background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(priceRange[1] / 50000) * 100}%, #e5e7eb ${(priceRange[1] / 50000) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-700">
                <span className="font-medium">LKR 0</span>
                <span className="font-semibold text-black">LKR {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-black">Brand</h4>
            <div className="space-y-2">
              {allBrands.map(brand => (
                <label key={brand} className="flex items-center hover:bg-yellow-50 p-2 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedBrands(prev => [...prev, brand]);
                      else setSelectedBrands(prev => prev.filter(b => b !== brand));
                    }}
                    className="text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h4 className="font-medium mb-3 text-black">Sort By</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white hover:border-yellow-300 transition-colors"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel - Banner Images Only */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {/* Main Carousel Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0"
            >
              <img
                src={slide.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                style={{ imageRendering: 'crisp-edges' }}
                onLoad={() => console.log('✅ Banner image loaded:', slide.image)}
                onError={(e) => {
                  console.error('❌ Banner image failed to load:', slide.image);
                  console.error('Error details:', e);
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-yellow-400 scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trending Items Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Items</h2>
          <button className="text-yellow-600 hover:text-yellow-700 font-semibold">
            View All →
          </button>
        </div>
        
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {mockProducts.filter(p => p.isTrending).map(product => (
            <div key={product.id} className="flex-none w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>
          
          {/* Mobile Filter Overlay */}
          {showMobileFilters && <FilterSidebar isMobile={true} />}
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Support Section */}
      <div className="bg-yellow-400 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-full">
                <FontAwesomeIcon icon={faHeadphones} className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Customer Support</h3>
                <p className="text-sm text-gray-800">8am - 5pm</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-full">
                <FontAwesomeIcon icon={faTruck} className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-black">Island-wide Delivery</h3>
                <p className="text-sm text-gray-800">Free shipping over LKR 5,000</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-full">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">Express Delivery</h3>
                <p className="text-sm text-gray-800">Same day delivery</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-black p-3 rounded-full">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-black">100+ Service Centers</h3>
                <p className="text-sm text-gray-800">Island wide coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
