import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    name: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String 
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String }
    },
    paymentMethod: { 
      type: String, 
      required: true,
      enum: ['PayPal', 'Stripe', 'Cash on Delivery']
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    },
    itemsPrice: { 
      type: Number, 
      required: true, 
      default: 0.0 
    },
    taxPrice: { 
      type: Number, 
      required: true, 
      default: 0.0 
    },
    shippingPrice: { 
      type: Number, 
      required: true, 
      default: 0.0 
    },
    totalPrice: { 
      type: Number, 
      required: true, 
      default: 0.0 
    },
    isPaid: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    paidAt: { 
      type: Date 
    },
    isDelivered: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    deliveredAt: { 
      type: Date 
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    orderNumber: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
