import { Request, Response } from "express";
import { ProductModel } from "../models/productModel";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.log(`Error while fetching all products : ${error}`);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, quantity, unitPrice } = req.body;
    if (!name || !description || !quantity || !unitPrice) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const productImageLocalPath = req.file?.path;
    if (!productImageLocalPath) {
      return res.status(400).json({ error: "Product Image is required" });
    }

    const product = await ProductModel.create({
      productName: name,
      productImage: productImageLocalPath,
      description,
      quantity,
      unitPrice,
    });
    res
      .status(201)
      .json({ data: product, message: "Product created successfully" });
  } catch (error) {
    console.log(`Error while fetching all products : ${error}`);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

export { getAllProducts, addProduct };
