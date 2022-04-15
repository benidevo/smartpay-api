const { RateLimiterMemory } = require("rate-limiter-flexible");

const AppError = require("../utils/appError");

const limiter = new RateLimiterMemory({
  points: 10,
  duration: 5,
});

module.exports = async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError(`Too many requests.`, 429);
  }
};
