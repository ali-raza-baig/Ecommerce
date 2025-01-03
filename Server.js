import express from "express";
import dotenv from "dotenv";
import { connection } from "./Config/DB.js";
import morgan from "morgan";
import AuthRoutes from "./Routes/AuthRoutes.js";
import CategoryRoutes from "./Routes/CategoryRoutes.js";
import productRoutes from "./Routes/productsRoutes.js";
import cors from "cors";
import PaymentRoutes from './Routes/PaymentRoutes.js';
import path from 'path';
import { fileURLToPath } from "url";

// Configure Environment Variables
dotenv.config();

// Determine __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express App
const app = express();

// Middleware Configuration
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

// Database Connection
connection();

// API Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/payment", PaymentRoutes);

// Serve Static Files from Vite Build Directory (Frontend)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle Client-Side Routing for React App
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000; // Default to port 5000 if undefined
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
