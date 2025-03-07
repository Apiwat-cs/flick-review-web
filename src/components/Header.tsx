import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between relative z-10 max-w-6xl ">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-3xl font-bold">FlickReviews</Link>
          </div>
        <nav className="flex items-center gap-1.5 ">
          <ul className="justify-between hidden md:flex gap-6">
            <div className='flex items-center gap-6'>
              <li><Link to="/Movie" className="hover:text-blue-300 transition-colors ">Movie</Link></li>
              <li><Link to="/TV" className="hover:text-blue-300 transition-colors ">TV</Link></li>
            </div>
            <div 
              className="
              border-b-[1.5px]
              border-white
              flex
              items-center
              p-1
              flex-[0.5]
              focus-within:border-primary
              ">
              <input
                onClick={(e) => e.currentTarget.select()}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                type="text"
                className="bg-transparent outline-0 flex-1"
                placeholder='search'
              />
              <IoIosSearch> size={20}</IoIosSearch>
            </div>
            <button
                  className= "text-white hover:text-cyan-400" onClick={() => {}}
  
                >
                  Log In
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
