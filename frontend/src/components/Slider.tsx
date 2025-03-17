import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";
import { fetchPopularMovies } from "../services/api";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";

const Slider: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  // ดึงข้อมูลจาก fetchPopularMovies 
  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const popularMovies = await fetchPopularMovies();
        // กรองเฉพาะหนังที่มี backdrop_path เท่านั้น
        const filteredMovies = popularMovies.filter((movie) => movie.backdrop_path);
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-red-600 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-red-600",
        }}
        loop
        onSlideChange={handleSlideChange}
        className="w-full h-96 sm:h-[500px] md:h-[500px] lg:h-[600px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10"></div>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center items-start px-8 py-16 md:p-10 lg:p-16 text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shadow-lg max-w-2xl">{movie.title}</h1>
              <p className="text-base md:text-lg mt-2 md:mt-4 max-w-xl line-clamp-2 md:line-clamp-3 text-shadow-md opacity-90">
                {movie.overview}
              </p>
              <button className="mt-4 md:mt-6 px-6 py-2 bg-gradient-to-r from-blue-900 to-purple-900 hover:bg-purple-700 rounded-full text-white font-medium flex items-center justify-center transition duration-300 ease-in-out">
                <Link to={`/movie/${movie.id}`} className="w-full h-full text-center">
                  ดูเพิ่มเติม
                </Link>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls (Bottom Bar) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/50 to-transparent ">
        <div className="container mx-auto flex items-center justify-between ">
          <div className="flex items-center space-x-2 flex-wrap lg:flex-nowrap">
            <button
              onClick={handlePrev}
              className="pb-2 text-white hover:text-red-500 transition-colors duration-300"
              aria-label="Previous slide"
            >
              <IoIosArrowBack size={30} />
            </button>

            {/* Thumbnail Navigator */}
            <div className="hidden lg:flex items-center space-x-2 pb-2">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`cursor-pointer transition-all duration-300 ${activeIndex === index ? "border-2 border-red-600 opacity-100 scale-105" : "border border-white/20 opacity-60 hover:opacity-80"}`}
                  onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-12 w-20 object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="pb-2 text-white hover:text-red-500 transition-colors duration-300"
              aria-label="Next slide"
            >
              <IoIosArrowForward size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

