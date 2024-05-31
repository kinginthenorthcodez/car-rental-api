import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
//require('dotenv').config();
const userRouter = require('./routes/userRoute');
const vehicleRouter = require('./routes/vehicleRoute')
const reservationRouter = require('./routes/reservationRoute')


// initialize application
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
app.use('/vehicles', vehicleRouter)
app.use('/reservation',reservationRouter)
app.get('/', (req:Request, res:Response) => {
  res.status(200).send(
    
    `
    <div style="backgroundColor: black">
    <h2>A simple Car rental API</h2>
    <p> Discover your next travel comforts with our service Cars! </p>

    <h4>Check the documentation or README file on our to use the Car rental api </h4>
    </div>
    `
  )
});

app.listen(PORT, () => {
  console.log(`Server running on  localhost:${PORT}`);
});
