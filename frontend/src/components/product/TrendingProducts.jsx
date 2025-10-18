import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import api from '../../api/axios'; 

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products/trending');
      setTrendingProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching trending products:', err);
      setError('Failed to load trending products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  const handleViewAll = () => {
    navigate('/products', { state: { filter: 'trending' } });
  };

  const ProductCard = ({ product }) => {
    const imageUrl = product.images && product.images.length > 0
      ? `${api.defaults.baseURL.replace('/api','')}${product.images[0]}`
      : null;

    return (
      <div
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer flex flex-col h-full"
        onClick={() => handleProductClick(product)}
      >
        <div className="relative overflow-hidden rounded-t-xl flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
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

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm min-h-[40px]">
            {product.name}
          </h3>

          {product.brand && <p className="text-xs text-gray-600 mb-2">{product.brand}</p>}

          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.ratings?.average || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">
              ({product.ratings?.average || 0})
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
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
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Items</h2>
          <button className="text-yellow-600 hover:text-yellow-700 font-semibold">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 animate-pulse h-full">
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Items</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchTrendingProducts}
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
        <h2 className="text-3xl font-bold text-gray-900">Trending Items</h2>
        <button
          onClick={handleViewAll}
          className="text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          View All →
        </button>
      </div>

      {trendingProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No trending products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
