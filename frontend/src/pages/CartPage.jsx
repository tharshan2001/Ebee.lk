import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { items, loading, error, updateQuantity, removeFromCart, clearCart, cartTotal, cartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/home" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Cart Items */}
          <section className="lg:col-span-7">
            <div className="bg-white shadow-sm rounded-lg">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.product._id} className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="w-20 h-20 rounded-md object-cover"
                          src={item.product.images?.[0] || '/placeholder-image.jpg'}
                          alt={item.product.name}
                        />
                      </div>

                      <div className="ml-6 flex-1">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-medium text-gray-900 truncate">
                              <Link 
                                to={`/product/${item.product.slug}`}
                                className="hover:text-blue-600"
                              >
                                {item.product.name}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.category}
                            </p>
                            <p className="mt-1 text-lg font-semibold text-gray-900">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flex">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.product._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-lg font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order Summary */}
          <section className="mt-16 bg-white rounded-lg shadow-sm px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Items ({cartItemsCount})</dt>
                <dd className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                <dd className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/home"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
