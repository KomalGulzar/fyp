// import React from 'react'
// import {FaSearch} from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { useSelector} from 'react-redux'
// const Header = () => {
//   const {currentUser} = useSelector(state=> state.user)
//   return (
//     <header className='bg-slate-200 shadow-md '>
//         <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//             <Link to='/'>
//             <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//             <span className='text-slate-500'>Pakistan</span>
//             <span className='text-slate-700'> Exporters</span>
//             </h1>
//             </Link>


//         <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
//             <input type="text" placeholder='Search....' className='bg-transparent focus:outline-none w-24 sm:w-64'  />
//             <FaSearch className="text-slate-600"/>
//         </form>
//         <ul className='flex gap-4'>
//             <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
//             <Link to='/about'><li className='hidden sm:inline text-slate-700 hover:underline' >About</li></Link>
//             <Link to='/profile'>
//             {currentUser ? (
//                <img  className='rounded-full h-7 w-7 object-cover ' src={currentUser.avatar} alt="profile" />
//             ): (<li className='text-slate-700 hover:underline'>Sign In</li>)
//           }
//           </Link>


//         </ul>
//         </div>


//     </header>
//   )
// }

// export default Header




import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MegaMenu from "./MegaMenu.jsx";
import { User } from "lucide-react";
import logo from "../assets/logo.png";


const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // To toggle mobile menu
  const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
let debounceTimer;


  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Function to close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(`/api/listing/get?search=${query}&limit=5`);
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  

  return (
    <header className='bg-white shadow-md'>
      <div className='flex items-center max-w-7xl mx-auto'>
        {/* Mobile Menu Toggle Button (Hamburger) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-3 mr-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Logo */}
        <NavLink to='/'>
        <div className='ml-10'>

          <h1 className='font-bold text-xl sm:text-2xl text-gray-800 drop-shadow-md'>
            <span className='text-[#0056B3]'>Pakistan</span>
            <span className='text-[#333333]'>Exporters</span>
          </h1>
        </div>

          {/* <div className='w-32'>

    <img 
      src={logo}
      alt="Pakistan Exporters Logo"
      className=" h-auto object-contain"
    />
  
 </div> */}


        </NavLink>

        {/* Desktop Menu (Hidden on Small Screens) */}
        <ul className="hidden sm:flex items-center ml-10  text-black ">
         <div className="relative mx-4 p-[3px] rounded-full bg-gradient-to-r from-blue-700 to-[#C0C0C0]">
  <form
    onSubmit={handleSearch}
    className="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow ease-in-out flex items-center w-120 px-4"
  >
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent focus:outline-none w-full py-2 px-3 rounded-full text-gray-600"
      value={searchTerm}
      onChange={(e) => {
        const val = e.target.value;
        setSearchTerm(val);
        clearTimeout(debounceTimer);
        if (val.trim() === "") {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        debounceTimer = setTimeout(() => fetchSuggestions(val), 300);
      }}
    />
    <button type="submit" className="p-3">
      <FaSearch className="text-[#0056B3] hover:text-[#333333] transition-colors ease-in-out" />
    </button>
  </form>

  {/* Suggestions dropdown */}
  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute bg-white z-50 mt-1  shadow-lg w-full  border border-gray-300">
      {suggestions.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm text-gray-700"
          onClick={() => {
            setSearchTerm(item.p_name);
            setShowSuggestions(false);
            navigate(`/search?searchTerm=${item.p_name}`);
          }}
        >
          {item.p_name}
        </div>
      ))}
    </div>
  )}
</div>

          <NavLink>
            <MegaMenu />
          </NavLink>
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              `p-7 transition-all ease-in-out ${isActive ? "bg-blue-100" : "hover:bg-blue-100"}`
            }
          >
            Home
          </NavLink> */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-7 transition-all ease-in-out ${isActive ? "bg-blue-100" : "hover:bg-blue-100"}`
            }
          >
            About
          </NavLink>

          {/* <NavLink
            to="/pages"
            className={({ isActive }) =>
              `p-7 transition-all ease-in-out ${isActive ? "bg-blue-100" : "hover:bg-blue-100"}`
            }
          >
            Pages
          </NavLink> */}

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `p-7 transition-all ease-in-out ${isActive ? "bg-blue-100" : "hover:bg-blue-100"}`
            }
          >
            Contact Us
          </NavLink>

         
        </ul>

        {/* Search Form (Icon only on mobile, full text input on larger screens) */}


        {/* Profile or Default Icon */}
        <div className='flex items-end'>
          <NavLink to="/profile">
            {currentUser ? (
              <img className="rounded-full h-8 w-8 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <ul className='list-none rounded-full h-8 w-8 object-cover bg-blue-600 flex items-center justify-center hover:bg-blue-500 my-2'>
                <li className="transition-all ease-in-out"><User size={20} className='text-white' /></li>
              </ul>
            )}
          </NavLink>
        </div>
      </div>

      {/* Mobile Full Screen Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 sm:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div
        className={`fixed left-0 top-0 w-full h-full bg-[#0056B3] shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Menu Links */}
        <ul className="flex flex-col items-start text-[#C0C0C0] mt-4 space-y-4 p-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-3 transition-all ease-in-out ${isActive ? "bg-[#333333]" : "hover:bg-[#333333]"}`
            }
            onClick={closeMenu} // Close menu when clicked
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-3 transition-all ease-in-out ${isActive ? "bg-[#333333]" : "hover:bg-[#333333]"}`
            }
            onClick={closeMenu} // Close menu when clicked
          >
            About
          </NavLink>

          <NavLink
            to="/pages"
            className={({ isActive }) =>
              `p-3 transition-all ease-in-out ${isActive ? "bg-[#333333]" : "hover:bg-[#333333]"}`
            }
            onClick={closeMenu} // Close menu when clicked
          >
            Pages
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `p-3 transition-all ease-in-out ${isActive ? "bg-[#333333]" : "hover:bg-[#333333]"}`
            }
            onClick={closeMenu} // Close menu when clicked
          >
            Contact Us
          </NavLink>

          <NavLink
            onClick={closeMenu} // Close menu when clicked
          >
            <MegaMenu />
          </NavLink>
        </ul>

        {/* Close Button (Click to Hide Menu) */}
        <button
          className="absolute top-6 right-6 text-white p-2"
          onClick={() => setMenuOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
