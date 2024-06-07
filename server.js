import express from 'express';
import { config } from 'dotenv';
import connectToDB from './src/config/db.js';
import userRouter from './src/router/userRouter.js';
import bookRouter from './src/router/bookRouter.js';
import cors from 'cors'


config();
const app = express();
const port = 5070 || process.env.PORT;
const url = process.env.URI || null;

 app.use(express.json());
 app.use(cors({
   origin: true
 }))

//users
app.use('/users', userRouter)

//books
app.use('/books', bookRouter)


 app.get('/home' , (req, res) =>{
    res.send("This is home route");
 })

 app.listen(port , async() =>{
    await connectToDB(url);
    console.log(`Server is running in ${port}`);
 })