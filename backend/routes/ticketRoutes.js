import express from 'express';
import ticketControllers from '../controllers/ticketControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';
import createTicketLimit from '../middlewares/rateLimiter.js';
import ticketLimiter from '../middlewares/userTicketLimiter.js';

const ticketRoute = express.Router();

const {raiseTicket, getTickets} = ticketControllers;

ticketRoute.post('/raiseticket', verifyToken, ticketLimiter, raiseTicket);

ticketRoute.get('/gettickets', verifyToken, getTickets);

export default ticketRoute;