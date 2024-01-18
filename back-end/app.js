import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import path from 'path'


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

app.use('/back-end/uploads', express.static("back-end/uploads"))

app.use(express.static(path.join(__dirname, '/front-end/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'))
})



export const connectDB = async () => {
    mongoose.connect(process.env.MONGO)
        .then((data) => {
            console.log(`Connected to data base -- ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(`Failed to connect with DB ${err}`);
        })
}

export { app }
