import rateLimit from 'express-rate-limit';
import ERROR_CODES from '../constants/errors.js';

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: ERROR_CODES.RATE_LIMIT.message
});

export default rateLimiter;
