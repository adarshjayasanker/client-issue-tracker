import express from 'express';
import authControllers from '../controllers/authControllers.js';
import verifyToken from '../middlewares/authMiddleware.js';

const {login, register, getMe} = authControllers;

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.get('/me', verifyToken, getMe)

export default authRoutes;