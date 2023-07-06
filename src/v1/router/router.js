const express = require("express");
const router = express.Router();

// Auth
const authMiddleware = require("../middleware/auth");
const productMiddleware = require("../middleware/product");

const limiter = require("../middleware/rateLimitMiddleware");

// Controllers
const authController = require("../controllers/auth");
const productController = require("../controllers/product");
const invoiceController = require("../controllers/invoice");

router.get("/api/v1/", limiter, (req, res) => {
  res.status(200).json({
    message: "Module is available 🚀🚀🚀",
  });
});
//Auth
router.post(
  "/api/v1/auth/register",
  authMiddleware.register,
  authController.Register
);
router.post(
  "/api/v1/auth/login",
  limiter,
  authMiddleware.login,
  authController.Login
);

// product
router.post(
  "/api/v1/product",
  productMiddleware.createProduct,
  authMiddleware.getToken,
  productController.createProduct
);
router.patch(
  "/api/v1/product/:productID",
  limiter,
  authMiddleware.getToken,
  productController.editProduct
);
router.get(
  "/api/v1/product/:productID",
  limiter,
  authMiddleware.getToken,
  productController.getOneProduct
);
router.get(
  "/api/v1/product",
  limiter,
  authMiddleware.getToken,
  productController.getAllProducts
);
router.delete(
  "/api/v1/product/:productID",
  limiter,
  authMiddleware.getToken,
  productController.deleteProduct
);

// invoice
const {
  AddItem,
  AddItemLike,
  AddItemComment,
  getItem,
  getOneItem,
  getOtherItem,
  deleteItem,
  deleteItemLike,
  deleteItemComment,
} = require("../middleware/invoice");

router.use("/api/v1/invoice/addItem", AddItem);
router.use("/api/v1/invoice/addItemLike", AddItemLike);
router.use("/api/v1/invoice/addItemComment", AddItemComment);
router.use("/api/v1/invoice/getItem", getItem);
router.use("/api/v1/invoice/getOtherItem", getOtherItem);
router.use("/api/v1/invoice/deleteItem", deleteItem);
router.use("/api/v1/invoice/deleteItemLike", deleteItemLike);
router.use("/api/v1/invoice/deleteComment", deleteItemComment);

// Invoice routes
router.post(
  "/api/v1/invoice",
  limiter,
  authMiddleware.getToken,
  invoiceController.createInvoice
);
router.get(
  "/api/v1/invoice",
  limiter,
  authMiddleware.getToken,
  invoiceController.getAllInvoices
);
router.get(
  "/api/v1/invoice/:invoiceID",
  limiter,
  authMiddleware.getToken,
  invoiceController.getOneInvoice
);
router.delete(
  "/api/v1/invoice/:invoiceID",
  limiter,
  authMiddleware.getToken,
  invoiceController.deleteInvoice
);

module.exports = router;
