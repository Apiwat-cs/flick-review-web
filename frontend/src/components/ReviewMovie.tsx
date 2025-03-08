import React, { useState } from "react";
import axios from "axios";

interface ReviewFormData {
    username: string;
    rating: number;
    review: string;
}

const ReviewMovie: React.FC<{ movieId: string }> = ({ movieId }) => {
    const [formData, setFormData] = useState<ReviewFormData>({
        username: "",
        rating: 0,
        review: "",
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/reviews/${movieId}`, formData);
            if (response.status === 200) {
                setMessage("รีวิวของคุณถูกบันทึกแล้ว!");
                setFormData({ username: "", rating: 0, review: "" });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setMessage("เกิดข้อผิดพลาดในการส่งรีวิว.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">รีวิวจากผู้ใช้</h2>
            <div className="review-container max-w-xl mx-auto mt-10 p-6 border border-gray-300 rounded-md">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold">ชื่อผู้ใช้</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-semibold">คะแนน</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            required
                            className="w-full p-2 mt-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="review" className="block text-sm font-semibold">รีวิว</label>
                        <textarea
                            id="review"
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full p-2 mt-2 border rounded-md"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                        </button>
                    </div>
                    {message && <div className="mt-4 text-center">{message}</div>}
                </form>
            </div>
        </div>
    );
};

export default ReviewMovie;
