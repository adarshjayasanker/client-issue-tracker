import express from 'express';
import ticketControllers from '../controllers/ticketControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';

const ticketRoute = express.Router();

const {raiseTicket, getTickets} = ticketControllers;

ticketRoute.post('/raiseticket', verifyToken, raiseTicket);

ticketRoute.get('/gettickets', verifyToken, getTickets);

export default ticketRoute;