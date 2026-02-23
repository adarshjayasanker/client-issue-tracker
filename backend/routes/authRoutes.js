import express from 'express';
import authControllers from '../controllers/authControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';
import ipLimiter from '../middlewares/ipLimiter.js';

const {login, register, getMe} = authControllers;

const authRoutes = express.Router();

authRoutes.post('/login', ipLimiter, login);
authRoutes.post('/register', ipLimiter, register);
authRoutes.get('/me', verifyToken, getMe)

export default authRoutes;