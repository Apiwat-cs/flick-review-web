import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// โหลดค่าแวดล้อมจาก .env
dotenv.config();

// Middleware
app.use(cors());  
app.use(express.json());  

// เชื่อมต่อ MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flick-review";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/reviews", reviewRoutes);  

// API Route ตัวอย่าง
app.get("/", (req, res) => {
    res.send("🚀 Backend is running...");
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
