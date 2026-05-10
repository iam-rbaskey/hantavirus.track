import rateLimit from 'express-rate-limit';

export const dashboardRateLimiter = rateLimit({ windowMs: 60 * 1000, max: 100, message: { success: false, error: 'Rate limit exceeded' } });
export const countriesRateLimiter = rateLimit({ windowMs: 60 * 1000, max: 100, message: { success: false, error: 'Rate limit exceeded' } });
export const newsRateLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, message: { success: false, error: 'Rate limit exceeded' } });
export const timelineRateLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, message: { success: false, error: 'Rate limit exceeded' } });
