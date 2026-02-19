import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import healthApi from './routes/healthAPI.js';
import authRoutes from './routes/authRoutes.js';
import ticketRoute from './routes/ticketRoutes.js';

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT;

app.use('/auth', authRoutes);
app.use('/ticket', ticketRoute);
app.use('/health', healthApi);

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Database Connected and Server Started Successfully at Port ${port}`);
    })
})
.catch((error) => {
    console.error(`Connection failed: ${error} `);
})





