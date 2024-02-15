import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import path from 'path'
import dotenv from 'dotenv';
import cloudinrary from 'cloudinary'
dotenv.config({ path: './back-end/.env' });


//Route Imports
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";


const __dirname = path.resolve()


//Middlewares
app.use(express.json())
app.use(cors())


//Routes
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/payment', paymentRouter)


app.use(express.static(path.join(__dirname, '/front-end/build')))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'))
})


//Data Base connection
export const connectDB = async () => {
    mongoose.connect(process.env.MONGO)
        .then((data) => {
            console.log(`database connected`);
        })
        .catch((err) => {
            console.log(`Failed to connect with DB ${err}`);
        })
}
connectDB()

cloudinrary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

app.listen(process.env.PORT, () => {
    console.log(`port connected to ${process.env.PORT}`);
})