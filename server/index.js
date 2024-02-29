import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js'
import questionRoutes from './routes/questions.js'
import answerRoutes from './routes/answer.js'
import subscriptionRoutes from './routes/subscription.js'

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();


app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes);
app.use("/questions", questionRoutes)
app.use("/answer", answerRoutes)
app.use("/subscription", subscriptionRoutes)

const PORT = process.env.PORT || 5001

const DATABASE_URL = process.env.CONNECTION_URL 

mongoose.connect(DATABASE_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => console.log(err.message));