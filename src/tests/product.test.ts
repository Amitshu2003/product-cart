import { Request, Response } from "express";
import { getAllProducts, addProduct } from "../controllers/productController"; 
import { ProductModel } from "../models/productModel";

jest.mock("../models/productModel", () => ({
  ProductModel: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));

describe("getAllProducts", () => {
  it("should return all products", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockProducts = [{ name: "Product 1" }, { name: "Product 2" }];
    (ProductModel.find as jest.Mock).mockResolvedValue(mockProducts);

    await getAllProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockProducts });
  });

  it("should handle error when fetching products", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const errorMessage = "Error fetching products";
    (ProductModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await getAllProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Something Went Wrong" });
  });
});

describe("addProduct", () => {

  it("should handle missing fields", async () => {
    const mockRequest = {
      body: { name: "", description: "", quantity: "", unitPrice: "" },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await addProduct(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("should handle missing product image", async () => {
    const mockRequest = {
      body: {
        name: "New Product",
        description: "Description",
        quantity: 10,
        unitPrice: 20,
      },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await addProduct(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Product Image is required" });
  });

  it("should add a new product", async () => {
    const mockRequest = {
      body: {
        name: "New Product",
        description: "Description",
        quantity: 10,
        unitPrice: 20,
      },
      file: { path: "/path/to/product/image.jpg" },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockCreatedProduct = { name: "New Product", description: "Description", quantity: 10, unitPrice: 20 };
    (ProductModel.create as jest.Mock).mockResolvedValue(mockCreatedProduct);

    await addProduct(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: mockCreatedProduct, message: "Product created successfully" });
  });

});