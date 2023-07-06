const express = require('express');
const router = express.Router();

// Auth
const authMiddleware = require("../middleware/auth")
const productMiddleware = require("../middleware/product")

const limiter = require("../middleware/rateLimitMiddleware")

const authController = require("../controllers/auth")
const productController = require("../controllers/product")
const invoiceController = require("../controllers/invoice")



router.get("/api/v1/", limiter,(req, res) => {
    res.status(200).json({
      message: "Module is available 🚀🚀🚀"
    });
  });
//Auth
router.post('/api/v1/auth/register', authMiddleware.register, authController.Register);
router.post('/api/v1/auth/login',limiter, authMiddleware.login, authController.Login);

// product
router.post('/api/v1/product', productMiddleware.createProduct,authMiddleware.getToken, productController.createProduct);
router.patch('/api/v1/product/:productID',limiter,authMiddleware.getToken, productController.editProduct);
router.get('/api/v1/product/:productID',limiter,authMiddleware.getToken, productController.getOneProduct);
router.get('/api/v1/product',limiter, authMiddleware.getToken, productController.getAllProducts);
router.delete('/api/v1/product/:productID',limiter, authMiddleware.getToken, productController.deleteProduct);

//
// invoice
// Invoice routes
router.post('/api/v1/invoice',limiter, authMiddleware.getToken, invoiceController.createInvoice);
router.get('/api/v1/invoice',limiter, authMiddleware.getToken, invoiceController.getAllInvoices);
router.get('/api/v1/invoice/:invoiceID',limiter, authMiddleware.getToken, invoiceController.getOneInvoice);
router.delete('/api/v1/invoice/:invoiceID',limiter, authMiddleware.getToken, invoiceController.deleteInvoice);


module.exports = router;
