const express = require('express');
const router = express.Router();

// Auth
const authMiddleware = require("../middleware/auth")
const authController = require("../controllers/auth")

router.post('/v1/auth/register', authMiddleware.register, authController.Register);
router.post('/v1/auth/login', authMiddleware.login, authController.Login);

module.exports = router;