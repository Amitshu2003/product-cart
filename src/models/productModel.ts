import mongoose from "mongoose";

interface Products {
  productName: string;
  productImage: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const productSchema = new mongoose.Schema<Products>(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<Products>("Product", productSchema);
