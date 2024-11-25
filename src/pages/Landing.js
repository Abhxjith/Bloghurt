import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Globe } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-[#3D2CA3] opacity-5 transform -skew-y-6"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-24">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Share Your Story with the World
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Join our thriving community of writers and readers. Create, share, and discover 
          compelling stories that matter.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/create-blog"
            className="flex items-center bg-[#3D2CA3] text-white px-8 py-3 rounded-full hover:bg-[#332693] transition-colors"
          >
            Start Writing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/blogs"
            className="flex items-center px-8 py-3 rounded-full border-2 border-[#3D2CA3] text-[#3D2CA3] hover:bg-[#3D2CA3] hover:text-white transition-colors"
          >
            Explore Blogs
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="relative">
          <div className="absolute -right-4 -top-4 w-72 h-72 bg-[#3D2CA3] opacity-10 rounded-full"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-xl">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#3D2CA3] opacity-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#3D2CA3] bg-opacity-10">
              <BookOpen className="h-8 w-8 text-[#3D2CA3]" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Rich Editor</h3>
            <p className="text-gray-600">
              Create beautiful posts with our intuitive and powerful editing tools.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#3D2CA3] bg-opacity-10">
              <Users className="h-8 w-8 text-[#3D2CA3]" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Growing Community</h3>
            <p className="text-gray-600">
              Connect with like-minded writers and engage with passionate readers.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#3D2CA3] bg-opacity-10">
              <Globe className="h-8 w-8 text-[#3D2CA3]" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
            <p className="text-gray-600">
              Share your content with readers from around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;