const expressRateLimit = require('express-rate-limit');

const limiter = expressRateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 2 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

module.exports = limiter;
