import rateLimit from 'express-rate-limit';

const ticketLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
    message: {
        status: false,
        message: "You are creating tickets too quickly. Please wait a minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default ticketLimiter;