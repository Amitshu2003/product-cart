import mongoose from "mongoose";

interface CartItem {
  cartItem: mongoose.Types.ObjectId;
  quantity: number;
}

const cartSchema = new mongoose.Schema<CartItem>(
  {
    cartItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model<CartItem>("Cart", cartSchema);
