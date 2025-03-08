// reviewRoutes.js
import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();

router.post("/:movieId", async (req, res) => {
    const { username, rating, review } = req.body;
    const { movieId } = req.params;

    console.log("Received review data:", { movieId, username, rating, review }); // เพิ่ม log

    if (!username || !rating || !review) {
        console.log("Validation error: Missing required fields"); // เพิ่ม log
        return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }

    try {
        const newReview = new Review({
            movieId,
            username,
            rating,
            review,
        });
        await newReview.save();
        console.log("Review saved successfully:", newReview); // เพิ่ม log
        res.status(201).json({ message: "บันทึกรีวิวสำเร็จ!", review: newReview });
    } catch (error) {
        console.error("Error saving review:", error); // เพิ่ม log
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกรีวิว" });
    }
});

export default router;