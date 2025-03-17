import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import React, { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Update to match the parameter name used in SearchMovie component (query)
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch(""); 
    }
  };
  
  const handleMobileSearch = () => {
    if (search.trim()) {
      // Update to match the parameter name used in SearchMovie component (query)
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 text-white shadow-md">
      <div className="container mx-auto p-4 flex flex-row items-center justify-between relative z-10 max-w-6xl">
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-3xl font-bold">FlickReviews</Link>
        </div>

        <nav className="flex items-center gap-6">
          <form 
            onSubmit={handleSearch}
            className="border-b-[1.5px] border-white items-center p-1 flex-[0.5] focus-within:border-primary hidden md:flex"
          >
            <input
              type="text"
              className="bg-transparent outline-0 flex-1 text-white placeholder-gray-300"
              placeholder="ค้นหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" aria-label="ค้นหา">
              <IoIosSearch size={20} className="text-white cursor-pointer" />
            </button>
          </form>
          <IoIosSearch 
            size={24} 
            className="text-white cursor-pointer md:hidden hover:text-cyan-400" 
            onClick={handleMobileSearch}
          />
          <button 
            className="text-white hover:text-cyan-400" 
            onClick={() => navigate("/login")}
            aria-label="เข้าสู่ระบบ"
          >
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
