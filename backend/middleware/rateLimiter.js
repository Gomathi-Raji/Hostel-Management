import rateLimit from "express-rate-limit";

// Strict limiter for auth routes (login/register)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window
  message: { message: "Too many attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter for chat/AI routes
export const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15, // 15 requests per minute
  message: { message: "Too many chat requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limiter for SMS routes
export const smsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 SMS per hour
  message: { message: "SMS limit reached. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API limiter
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: { message: "Too many requests. Please try again shortly." },
  standardHeaders: true,
  legacyHeaders: false,
});
