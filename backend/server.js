import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// โหลดค่าแวดล้อมจาก .env
dotenv.config();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // URL ของ frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาต methods ที่จำเป็น
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เชื่อมต่อ MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flick-review";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use('/api/reviews', reviewRoutes); // ใช้ routes ของรีวิว

// API Route ตัวอย่าง
app.get("/", (req, res) => {
    res.send("🚀 Backend is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});