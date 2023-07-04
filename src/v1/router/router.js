const express = require('express');
const router = express.Router();

// Auth
const authMiddleware = require("../middleware/auth")
const limiter = require("../middleware/rateLimitMiddleware")

const authController = require("../controllers/auth")
const productController = require("../controllers/product")


router.get("/api/v1/", limiter,(req, res) => {
    res.status(200).json({
      message: "Module is available 🚀🚀🚀"
    });
  });

router.post('/api/v1/auth/register', authMiddleware.register, authController.Register);
router.post('/api/v1/auth/login',limiter, authMiddleware.login, authController.Login);
router.post('/api/v1/product', authMiddleware.getToken, productController.createProduct);
router.patch('/api/v1/product/:productID',authMiddleware.getToken, productController.editProduct);
router.get('/api/v1/product/:productID',authMiddleware.getToken, productController.getOneProduct);
router.get('/api/v1/product', authMiddleware.getToken, productController.getAllProducts);
router.delete('/api/v1/product/:productID', authMiddleware.getToken, productController.deleteProduct);
module.exports = router;
