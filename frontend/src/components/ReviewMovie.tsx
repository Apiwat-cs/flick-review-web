import React, { useState, useEffect } from "react";
import { createReview, getReviews, updateReview, deleteReview } from "../services/api";
import { SendHorizontal, Star, Edit, Trash } from "lucide-react";

interface Review {
  _id: string; 
  movieId: string;
  username: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface ReviewMovieProps {
  movieId: string | undefined;
}

const ReviewMovie: React.FC<ReviewMovieProps> = ({ movieId }) => {
  const [reviewData, setReviewData] = useState({
    username: '',
    rating: 1,
    review: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    if (!movieId) {
        setError("ไม่พบรหัสภาพยนตร์");
        setIsLoading(false);
        return;
    }

    try {
        setIsLoading(true);
        const data = await getReviews(movieId);
        console.log("Data from getReviews:", data);

        if (Array.isArray(data)) {
            setReviews(data);
            setError(null);
        } else {
            console.error("Invalid data format from getReviews:", data);
            setError("ข้อมูลรีวิวไม่ถูกต้อง");
        }
    } catch (err) {
        setError("ไม่สามารถโหลดรีวิวได้ โปรดลองอีกครั้งภายหลัง");
        console.error("Error fetching reviews:", err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleEdit = (review: Review) => {
    try {
      if (!review._id) {
        throw new Error("Review ID is undefined");
      }
  
      // เตรียมข้อมูลรีวิวที่ต้องการแก้ไข
      setReviewData({
        username: review.username,
        rating: review.rating,
        review: review.review,
      });
  
      // ตั้งค่า ID ของรีวิวที่กำลังแก้ไข
      setEditingReviewId(review._id);
  
      // รีเซ็ตข้อความแจ้งเตือน
      setMessage("");
      setMessageType("");
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการแก้ไข");
      setMessageType("error");
      console.error(error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!movieId) {
      setMessage("Movie ID is missing!");
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setMessage("");
    
    try {
      if (editingReviewId) {
        // แก้ไขรีวิว
        await updateReview(editingReviewId, {
          rating: reviewData.rating,
          review: reviewData.review,
        });
        setMessage("แก้ไขรีวิวสำเร็จ");
        setMessageType('success');
      } else {
        // สร้างรีวิวใหม่
        await createReview({ ...reviewData, movieId });
        setMessage("ส่งรีวิวสำเร็จ");
        setMessageType('success');
      }
  
      // รีเซ็ตฟอร์ม
      setReviewData({ username: "", rating: 1, review: "" });
      setEditingReviewId(null);
  
      // ดึงรีวิวใหม่หลังจากสร้างหรือแก้ไข
      fetchReviews();
    } catch (error) {
      setMessage("ไม่สามารถส่งรีวิวได้");
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [, setIsEditingOrDeleting] = useState(false);

  const handleDelete = async (reviewId: string) => {
    if (!reviewId) {
      console.error("Review ID is undefined");
      setMessage("ไม่สามารถลบรีวิวได้: ID ไม่ถูกต้อง");
      setMessageType('error');
      return;
    }
  
    try {
      setIsEditingOrDeleting(true); // Set loading state
      await deleteReview(reviewId); // ส่ง reviewId ไปยัง backend
      setMessage("ลบรีวิวสำเร็จ");
      setMessageType('success');
      fetchReviews(); // ดึงรีวิวใหม่หลังจากลบ
    } catch (error) {
      setMessage("ไม่สามารถลบรีวิวได้");
      setMessageType('error');
    } finally {
      setIsEditingOrDeleting(false); // Reset loading state
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderFormStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => 
            setReviewData(prev => ({ ...prev, rating: i }))
          }
          className="focus:outline-none"
        >
          <Star 
            size={24} 
            className={`transition-colors ${
              i <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          />
        </button>
      );
    }
    return stars;
  };

  const renderReviewStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <Star 
          key={i}
          size={16} 
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-6 px-4 max-w-6xl mx-auto ">

      {/* Reviews Display Section */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">รีวิวทั้งหมด {reviews.length > 0 && `(${reviews.length})`}</h2>
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">กำลังโหลดรีวิว...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && reviews.length === 0 && (
          <div className="bg-[#efefef] p-8 rounded-lg text-center">
            <h3 className="text-xl font-medium text-gray-700">ยังไม่มีรีวิว</h3>
            <p className="mt-2 text-gray-600">เป็นคนแรกที่แสดงความคิดเห็นสำหรับภาพยนตร์เรื่องนี้</p>
          </div>
        )}

        {/* Reviews List */}
        {!isLoading && !error && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-[#efefef] rounded-lg shadow-md p-5 border border-gray-100 ">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-black">{review.username}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderReviewStars(review.rating)}
                      <span className="ml-2 text-gray-600">
                        {review.rating}/10
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-3">
                  <div className="mt-3 text-gray-700 whitespace-pre-line">
                    {review.review}
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="mt-4 flex space-x-2 ">
                    <button onClick={() => handleEdit(review)} className="flex items-center space-x-1 px-3 py-1 text-black rounded-lg hover:text-blue-500">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(review._id)} className="flex items-center space-x-1 px-3 py-1 text-black rounded-lg hover:text-blue-500">
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 mt-8 px-6 max-w-3xl mx-auto bg-[#efefef] rounded-xl shadow-lg p-6">
        <div>
          <label htmlFor="username" className="block font-semibold text-lg mb-2 text-black">ชื่อผู้ใช้</label>
          <input
            type="text"
            id="username"
            name="username"
            value={reviewData.username}
            onChange={handleInputChange}
            required
            placeholder="กรุณาใส่ชื่อของคุณ"
            className="w-full p-3 rounded-lg border text-black border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
          />
        </div>
        
        <div>
          <label htmlFor="rating" className="block font-semibold text-lg mb-2 text-black">ให้คะแนน</label>
          <div className="flex items-center mb-2">
            {renderFormStars()}
            <span className="ml-3 text-xl font-bold text-black">{reviewData.rating}/10</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="review" className="block font-semibold text-lg mb-2 text-black">เขียนรีวิว</label>
          <textarea
            id="review"
            name="review"
            value={reviewData.review}
            onChange={handleInputChange}
            required
            placeholder="แชร์ความคิดเห็นของคุณเกี่ยวกับภาพยนตร์เรื่องนี้..."
            className="w-full p-3 rounded-lg border text-black border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            rows={5}
          />
        </div>
        
        {/* {message && (
          <div className={`text-center p-3 rounded-lg ${
            messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )} */}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center space-x-2 w-50 py-3 bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium disabled:bg-blue-400"
        >
          {isSubmitting ? (
            <span>กำลังส่ง...</span>
          ) : (
            <>
              <span>{editingReviewId ? 'อัปเดตรีวิว' : 'ส่งรีวิว'}</span>
              <SendHorizontal size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewMovie;