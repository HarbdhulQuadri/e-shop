const productService = require("../services/products");

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const result = await productService.createProduct(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const body = req.body;
    body.productID= req.params.productID;
    const result = await productService.editProduct(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.productID;
    const result = await productService.getOneProduct(productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productID;
    const result = await productService.deleteProduct(productId);
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

module.exports = {
  createProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct
};
