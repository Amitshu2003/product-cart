import { Request, Response } from "express";
import { CartModel } from "../models/cartModel";
import { ProductModel } from "../models/productModel";

const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const items = await CartModel.find()
      .populate("cartItem");
    res.status(200).json({ data: items });
  } catch (error) {
    console.log(`Error while fetching all cart items : ${error}`);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Please provide productId and quantity" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ error: "Product not found" });
    }

    const isProductInCart = await CartModel.findOne({ cartItem: productId });
    if (isProductInCart) {
      return res.status(400).json({ error: "Product already exists in cart" });
    }

    await CartModel.create({
      cartItem: product,
      quantity,
    })

    res
      .status(201)
      .json({ message: "Item Added to Cart Successfully", data: {product, quantity} });
  } catch (error) {
    console.log(`Error while adding into cart : ${error}`);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

const updateQuantityInCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Please provide productId and quantity" });
    }

    const product = await CartModel.findOne({ cartItem: productId });
    if (!product) {
      return res
        .status(400)
        .json({ error: "Product not found in cart" });
    }
    product.quantity = quantity;
    await product.save();
    res
      .status(200)
      .json({ message: "Quantity Updated Successfully", data: product });
  } catch (error) {
    console.log(`Error while adding into cart : ${error}`);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

export { getAllCartItems, addItemToCart, updateQuantityInCart };
