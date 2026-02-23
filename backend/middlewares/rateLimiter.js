import rateLimit from 'express-rate-limit';


const createTicketLimit = rateLimit({
    windowMs: 60*1000, 
    max: 5,
    message: {
        status: false,
        message: "Too many tickets created! Please wait a minute before trying again",
    },
    standardHeaders: true,
    legacyHeaders: true,
});

export default createTicketLimit;