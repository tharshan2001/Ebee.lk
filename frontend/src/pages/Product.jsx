import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, HeartIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { EyeIcon, TruckIcon } from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

// Mock product data - in real app this would come from API
const mockProduct = {
  id: 1,
  name: "Wireless Bluetooth Headphones Pro",
  price: 8997,
  originalPrice: 14995,
  discount: 40,
  rating: 4.5,
  reviewCount: 128,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=600&h=600&fit=crop&crop=center"
  ],
  description: "Premium wireless Bluetooth headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.",
  features: [
    "Active Noise Cancellation",
    "30-hour Battery Life",
    "Premium Sound Quality",
    "Comfortable Design",
    "Wireless Connectivity",
    "Built-in Microphone"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Battery Life": "30 hours",
    "Charging Time": "2 hours",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.0"
  },
  inStock: true,
  stockCount: 15
};

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // In real app, fetch product by ID
  const product = mockProduct;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(index);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const installmentPrice = Math.ceil(product.price / 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-yellow-600">Home</button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Product Details</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Side - Image Carousel */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="aspect-square relative">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
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

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    -{product.discount}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-yellow-400' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.reviewCount} reviews)</span>
                </div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-gray-50 to-yellow-50 p-6 rounded-2xl border border-yellow-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-gray-900">LKR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">LKR {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                or 3 x LKR {installmentPrice.toLocaleString()} with Koko
              </p>
              <p className="text-xs text-gray-500">Interest-free installments available</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
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
                  disabled={quantity >= product.stockCount}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-black hover:bg-gray-900 text-yellow-400 font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Buy Now
              </button>
            </div>

            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">Extra 10% OFF</h3>
                  <p className="text-sm text-yellow-700">Use code: EXTRA10</p>
                </div>
                <button className="bg-black hover:bg-gray-900 text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  Apply Code
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3 shadow-sm"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-gray-50 to-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm">
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

        {/* Product Description & Specifications */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
              Specifications
            </h3>
            <div className="space-y-3">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                  <span className="text-gray-600 font-medium">{key}</span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
