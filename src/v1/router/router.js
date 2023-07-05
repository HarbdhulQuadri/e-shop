const express = require('express');
const router = express.Router();

// Auth
const authMiddleware = require("../middleware/auth")
const { limiter, methodLimiter } = require('../middleware/rateLimitMiddleware');



const authController = require("../controllers/auth")
const productController = require("../controllers/product")


router.get("/api/v1/", limiter,(req, res) => {
    res.status(200).json({
      message: "Module is available 🚀🚀🚀"
    });
  });
//Auth
router.post('/api/v1/auth/register', authMiddleware.register, authController.Register);
router.post('/api/v1/auth/login', methodLimiter,limiter, authMiddleware.login, authController.Login);

//Products
router.get('/api/v1/product/:productID', methodLimiter, limiter, authMiddleware.getToken, productController.getOneProduct);
router.post('/api/v1/product', methodLimiter, limiter, authMiddleware.getToken, productController.createProduct);
router.patch('/api/v1/product/:productID', methodLimiter,limiter,authMiddleware.getToken, productController.editProduct);
router.get('/api/v1/product',limiter, authMiddleware.getToken, productController.getAllProducts);
router.delete('/api/v1/product/:productID',limiter, authMiddleware.getToken, productController.deleteProduct);
module.exports = router;
