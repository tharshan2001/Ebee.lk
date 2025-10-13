import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FunnelIcon, 
  XMarkIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("New Arrivals");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, sortBy, priceRange, selectedBrands, selectedRatings]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8001/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
      
      // Set max price for range slider
      if (data.length > 0) {
        const maxPrice = Math.max(...data.map(p => p.price));
        setPriceRange([0, maxPrice]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => 
        product.ratings && selectedRatings.some(rating => 
          Math.floor(product.ratings.average || 0) === rating
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Rating':
          return (b.ratings?.average || 0) - (a.ratings?.average || 0);
        case 'New Arrivals':
        default:
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleRatingToggle = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const ProductCard = ({ product }) => {
    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
        onClick={() => handleProductClick(product)}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          
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
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-14 text-sm">{product.name}</h3>
          
          {product.brand && (
            <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
          )}

          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIconSolid
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.ratings?.average || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">
              ({product.ratings?.average || 0})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-md font-bold text-gray-900">
                LKR {product.price?.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  LKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex mt-2 space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const FilterSidebar = ({ isMobile = false }) => {
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
    const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 100000;

    return (
      <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
        <div className={`${isMobile ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto' : 'bg-white rounded-xl shadow-lg p-6'}`}>
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
            
            {/* Categories */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                onClick={() => toggleFilterSection('category')}
              >
                <span>Category</span>
                {expandedFilters.category ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              
              {expandedFilters.category && (
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center hover:bg-yellow-50 p-2 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 font-medium">{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Price Range */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                onClick={() => toggleFilterSection('price')}
              >
                <span>Price Range</span>
                {expandedFilters.price ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              
              {expandedFilters.price && (
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-yellow-400"
                    style={{
                      background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${(priceRange[1] / maxPrice) * 100}%, #e5e7eb ${(priceRange[1] / maxPrice) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-700">
                    <span className="font-medium">LKR 0</span>
                    <span className="font-semibold text-black">LKR {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Brands */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
                onClick={() => toggleFilterSection('brand')}
              >
                <span>Brand</span>
                {expandedFilters.brand ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
              
              {expandedFilters.brand && (
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center hover:bg-yellow-50 p-2 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                      />
                      <span className="ml-3 text-sm text-gray-700 font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            
            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, maxPrice]);
                setSelectedBrands([]);
                setSelectedRatings([]);
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    );
  };

  const sortOptions = ["New Arrivals", "Price: Low to High", "Price: High to Low", "Rating"];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
        
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="hidden md:block p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white hover:border-yellow-300 transition-colors"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg"
          >
            <FunnelIcon className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
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
          {/* Mobile Sort Dropdown */}
          <div className="md:hidden mb-6">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, Math.max(...products.map(p => p.price))]);
                  setSelectedBrands([]);
                  setSelectedRatings([]);
                }}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;