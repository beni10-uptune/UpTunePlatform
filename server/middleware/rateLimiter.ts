import rateLimit from 'express-rate-limit';

// Spotify API endpoints - protect our Spotify quota
export const spotifyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute per IP
  message: { error: 'Too many search requests, please try again in a minute' },
  standardHeaders: true,
  legacyHeaders: false,
});

// AI endpoints - protect our Anthropic API quota
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 AI requests per minute per IP
  message: { error: 'Too many AI requests, please slow down' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Mutation endpoints - prevent spam and abuse
export const mutationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 create/update requests per minute per IP
  message: { error: 'Too many requests, please slow down' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth endpoints - strict limits to prevent brute force
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 auth attempts per 15 minutes per IP
  message: { error: 'Too many authentication attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact form endpoints - prevent spam
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 contact submissions per hour per IP
  message: { error: 'Too many contact submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API limiter - catch-all protection
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute per IP
  message: { error: 'Too many requests, please try again in a minute' },
  standardHeaders: true,
  legacyHeaders: false,
});
