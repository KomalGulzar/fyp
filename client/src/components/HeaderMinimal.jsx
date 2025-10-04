import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderMinimal = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center space-x-1">
            <span className="text-[#0056B3]">Pakistan</span>
            <span className="text-[#333333]">Exporters</span>
          </Link>
        </div>

        {/* Empty Center Section (for layout balance or future content) */}
        <div className="hidden sm:block flex-grow text-center">
         
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          {/* Back Link */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            ← Back to Profile
          </button>

          {/* View Website as subtle link */}
          <Link
            to="/"
            className="text-sm font-medium text-[#0056B3] border border-[#0056B3] px-3 py-1.5 rounded-md hover:bg-[#0056B3] hover:text-white transition hidden sm:inline-block"
          >
            View Website
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-blue-100"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <Link to="/" className="text-lg font-bold text-[#0056B3]">
            Pakistan<span className="text-[#333333]">Exporters</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => {
              navigate(-1);
              setMenuOpen(false);
            }}
            className="text-base font-medium text-gray-700 hover:text-blue-600"
          >
            ← Back to Profile
          </button>

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-[#0056B3] border border-[#0056B3] text-base font-medium px-4 py-2 rounded-md hover:bg-[#0056B3] hover:text-white transition"
          >
            View Website
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderMinimal;
