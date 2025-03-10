import { Link, useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import React from 'react';

function Header() {
  const navigate = useNavigate(); // ใช้ Hook นำทาง

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-row items-center justify-between relative z-10 max-w-6xl">
        
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-3xl font-bold">FlickReviews</Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
        {/* Search Bar (แสดงเต็มเฉพาะหน้าจอใหญ่) */}
        <div className="border-b-[1.5px] border-white items-center p-1 flex-[0.5] focus-within:border-primary 
                        hidden md:flex ">
          <input
            onClick={(e) => e.currentTarget.select()}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="Search"
          />
          <IoIosSearch size={20} className="text-white cursor-pointer " />
        </div>
        <IoIosSearch size={24} className="text-white cursor-pointer md:hidden hover:text-cyan-400" />
        <button
          className="text-white hover:text-cyan-400"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </nav>

      </div>
    </header>
  );
}

export default Header;
