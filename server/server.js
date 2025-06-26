import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoute.js'
import transactionRoutes from './routes/transactionRoute.js';
import errorHandler from './middleware/errorHandler.js';
import aiRoutes from './routes/aiRoute.js'

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/ai', aiRoutes)
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('SmartSpender server is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
console.log(`Server is running on port ${PORT}`);

});

