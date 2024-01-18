import { app, connectDB } from "./app.js";
import dotenv from 'dotenv';
dotenv.config({ path: './back-end/.env' });

//Data Base connection
connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Port running on http://localhost:${process.env.PORT}`);
})