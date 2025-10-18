import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StarIcon, HeartIcon, ShoppingCartIcon,
  ChevronLeftIcon, ChevronRightIcon,
  MinusIcon, PlusIcon
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import api from '../../api/axios';
import { useCart } from '../../context/CartContext';

const ProductView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/slug/${slug}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img) => `${api.defaults.baseURL.replace('/api', '')}${img}`;

  const nextImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(index);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      setAddingToCart(true);
      const result = await addToCart(product._id, quantity);
      if (result.success) {
        alert('Product added to cart!');
      } else {
        alert(result.error || 'Failed to add product to cart.');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    try {
      setAddingToCart(true);
      const result = await addToCart(product._id, quantity);
      if (result.success) {
        navigate('/cart');
      } else {
        alert(result.error || 'Failed to process Buy Now.');
      }
    } catch (err) {
      console.error('Error processing Buy Now:', err);
      alert('Failed to process Buy Now.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 text-lg mb-4">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );

  const installmentPrice = Math.ceil(product.price / 3);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-yellow-600">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/product')} className="hover:text-yellow-600">Products</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="aspect-square relative">
                {product.images?.length ? (
                  <img
                    src={getImageUrl(product.images[currentImageIndex])}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                {product.images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 text-yellow-400 p-3 rounded-full hover:bg-opacity-100 hover:scale-110 transition-all duration-200 shadow-lg"
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 text-yellow-400 p-3 rounded-full hover:bg-opacity-100 hover:scale-110 transition-all duration-200 shadow-lg"
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  </>
                )}

                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    -{discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-yellow-400' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${product.name} ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.ratings?.average || 0) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.ratings?.count || 0} reviews)</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-6 rounded-2xl border border-yellow-100 shadow-sm mt-4">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-4xl font-bold text-gray-900">LKR {product.price?.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">LKR {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">or 3 x LKR {installmentPrice.toLocaleString()} with Koko</p>
                <p className="text-xs text-gray-500">Interest-free installments available</p>
              </div>

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm font-semibold text-gray-700">Colors:</span>
                  <div className="flex space-x-2">
                    {product.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-yellow-50 text-gray-600 hover:text-black transition-all duration-200"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 text-center min-w-[60px] bg-white font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-yellow-50 text-gray-600 hover:text-black transition-all duration-200"
                    disabled={quantity >= product.stock}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full bg-black hover:bg-gray-900 text-yellow-400 font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={addingToCart}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3 shadow-sm"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Delivery */}
              <div className="bg-gradient-to-r from-gray-50 to-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm mt-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <TruckIcon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-700">Orders over LKR 5,000 qualify for free shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Details */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
              Product Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Category</span>
                <span className="text-gray-900 font-semibold">{product.category}</span>
              </div>
              {product.subcategory && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Subcategory</span>
                  <span className="text-gray-900 font-semibold">{product.subcategory}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Brand</span>
                  <span className="text-gray-900 font-semibold">{product.brand}</span>
                </div>
              )}
              {product.energyRating && (
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Energy Rating</span>
                  <span className="text-gray-900 font-semibold">{product.energyRating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
