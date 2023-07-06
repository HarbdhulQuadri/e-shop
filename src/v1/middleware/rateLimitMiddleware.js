// rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

// Define the rate limit options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum number of requests allowed within the defined window
  message: 'Too many requests, please try again later.', // Error message to be sent when rate limit is exceeded
});

module.exports = limiter;
