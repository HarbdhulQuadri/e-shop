const productModel = require("../models/products");

const createProduct = async (data) => {
  try {
    const result = await productModel.createProduct(data);
    return { success: true, data: result, message: "Product created successfully", status: 201 };
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

const editProduct = async (data) => {
  try {
    console.log(data);
    const result = await productModel.editProduct(data);
        return {
      success: true,
      data,
      message: "Product updated successfully",
      status: 200,
    };
  } catch (error) {
    throw new Error("Failed to update product");
  }
};


const getAllProducts = async () => {
  try {
    const result = await productModel.getAllProducts();
    return { success: true, data: result, message: "All products retrieved successfully", status: 200 };
  } catch (error) {
    throw new Error("Failed to retrieve products");
  }
};

const getOneProduct = async (data) => {
  try {
    const result = await productModel.getOneProduct(data);
    if (result) {
      return { success: true, data: result, message: "Product retrieved successfully", status: 200 };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error("Failed to retrieve product");
  }
};



const deleteProduct = async (productId) => {
  try {
    const result = await productModel.deleteProduct(productId);
    if (result) {
      return { success: true, message: "Product deleted successfully", status: 200 };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct
};
