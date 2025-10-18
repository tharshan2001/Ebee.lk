import React from 'react'
import Home from '../components/common/Home'
import TrendingProducts from '../components/product/TrendingProducts'
import ProductsPage from '../components/product/ProductsPage'

const HomePage = () => {
  return (
    <div>
      <Home/>
      <TrendingProducts/>
      <ProductsPage/>
    </div>
  )
}

export default HomePage
