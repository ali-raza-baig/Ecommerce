import express from "express";
import dotenv from "dotenv";
import { connection } from "./Config/DB.js";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import CategoryRoutes from "./Routes/CategoryRoutes.js";
import productRoutes from "./Routes/productsRoutes.js"
import cors from "cors";
import PaymentRoutes from './Routes/PaymentRoutes.js'
import path from 'path'
import { fileURLToPath } from "url";
// Configration 
const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// MiddleWare Configration 
dotenv.config();
app.use(morgan("combined"))
app.use(express.json())
app.use(cors())

// Routes Settings 
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/category", CategoryRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/payment", PaymentRoutes)
// Port Connection 
app.listen(process.env.PORT)
console.log(`Port connected on ${process.env.PORT} `)

// DataBass Connection 
connection()

app.get("/", function (req, res) {
    app.use(express.static(path.join(__dirname, './client/build')))
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})