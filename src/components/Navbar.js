import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, User } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#3D2CA3]" />
              <span className="text-2xl font-bold text-[#3D2CA3]">Bloghurt</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/blogs"
              className={`${
                isActiveLink("/blogs")
                  ? "text-[#3D2CA3] border-b-2 border-[#3D2CA3]"
                  : "text-gray-600 hover:text-[#3D2CA3]"
              } px-1 py-2 text-sm font-medium transition-colors`}
            >
              Explore
            </Link>
            <Link
              to="/create-blog"
              className={`${
                isActiveLink("/create-blog")
                  ? "text-[#3D2CA3] border-b-2 border-[#3D2CA3]"
                  : "text-gray-600 hover:text-[#3D2CA3]"
              } px-1 py-2 text-sm font-medium transition-colors`}
            >
              Write
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#3D2CA3] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-[#3D2CA3] rounded-full hover:bg-[#332693] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-[#3D2CA3] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/blogs"
              className={`${
                isActiveLink("/blogs")
                  ? "text-[#3D2CA3] bg-[#3D2CA3] bg-opacity-10"
                  : "text-gray-600 hover:bg-gray-50"
              } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Explore
            </Link>
            <Link
              to="/create-blog"
              className={`${
                isActiveLink("/create-blog")
                  ? "text-[#3D2CA3] bg-[#3D2CA3] bg-opacity-10"
                  : "text-gray-600 hover:bg-gray-50"
              } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Write
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/Auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#3D2CA3] hover:bg-[#332693] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;