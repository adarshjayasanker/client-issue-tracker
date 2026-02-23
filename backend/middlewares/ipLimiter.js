import rateLimit from 'express-rate-limit';

const ipLimiter = rateLimit({
    windowMs: 60*1000,
    max: 30,
    message: {
        status: false,
        message: "Too many requests from this network. Please slow down."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default ipLimiter;