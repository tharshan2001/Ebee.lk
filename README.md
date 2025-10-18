# Ebee.lk - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend (Customer Portal)
- **Product Browsing**: Browse products with detailed views
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Login/Register with Google OAuth support
- **Checkout Process**: Complete order placement with address management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **User Account**: Profile management, order history, address book

### Admin Panel
- **Dashboard**: Overview of orders, users, and products
- **Product Management**: Add, edit, delete products with image upload
- **User Management**: View and manage customer accounts
- **Order Management**: Track and update order status
- **Modern UI**: Clean, responsive admin interface

### Backend API
- **RESTful API**: Complete REST API with proper error handling
- **Authentication**: JWT-based auth with cookie support
- **File Upload**: Image upload with Multer
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS, bcrypt password hashing
- **Order System**: Complete order management with status tracking

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Heroicons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Passport.js** - OAuth integration

### Admin Panel
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router DOM** - Routing

## 📁 Project Structure

```
Pro_Ebee/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.js          # Entry point
├── frontend/              # React customer app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React contexts
│   │   ├── pages/         # Page components
│   │   └── api/           # API configuration
└── admin/                 # React admin panel
    └── src/
        ├── components/    # Admin components
        ├── pages/         # Admin pages
        └── layouts/       # Layout components
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pro_Ebee
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Admin Panel Setup**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Variables

Create `.env` files in the backend directory:

```env
# Backend .env
PORT=8001
MONGO_URI=mongodb://localhost:27017/ebee
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:8001

3. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:5173

4. **Start Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   Admin panel runs on http://localhost:5174

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/google` - Google OAuth login

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order payment status
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🔧 Development

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Follow React best practices

### Database Models
- **User**: Customer accounts
- **Product**: Product catalog
- **Cart**: Shopping cart items
- **Order**: Order management
- **Admin**: Admin accounts
- **Address**: Customer addresses

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build and deploy to your preferred platform (Heroku, Railway, etc.)
3. Ensure MongoDB connection is configured

### Frontend Deployment
1. Update API base URL in production
2. Build the application: `npm run build`
3. Deploy to Netlify, Vercel, or similar platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Tharshan** - Initial development

## 🐛 Known Issues

- Payment integration is basic (Cash on Delivery only implemented)
- Email notifications not implemented
- Advanced search and filtering needs enhancement

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Mobile app development

## 📞 Support

For support, email support@ebee.lk or create an issue in the repository.
