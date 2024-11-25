import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import { fetchBlogs } from "../blogService";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  const getPreview = (content) => {
    if (!content) return "Content coming soon...";
    const words = content.split(" ").slice(0, 30).join(" ");
    return words + (content.split(" ").length > 30 ? "..." : "");
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Blogs</h1>
        <button
          onClick={() => navigate("/create-blog")}
          className="flex items-center gap-2 bg-[#3D2CA3] hover:bg-[#3D2CA3]
 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <PlusCircle size={20} />
          <span className="font-medium">Write a story</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D2CA3] 
-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Featured Post Hero */}
{filteredBlogs.length > 0 && (
  <div className="mb-12">
    <article
      onClick={() => navigate(`/blogs/${filteredBlogs[0].id}`)}
      className="cursor-pointer group bg-gradient-to-br from-[#3D2CA3] to-[#6366F1] rounded-2xl p-1 hover:shadow-2xl transition-all duration-300"
    >
      <div className="bg-white rounded-xl p-8 h-full transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-300 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-100 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-300 blur-2xl" />
          
          {/* Featured Tag */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#3D2CA3] animate-pulse" />
            <span className="text-sm font-medium text-[#3D2CA3] tracking-wide">Featured Post</span>
          </div>

          {/* Title with custom underline animation */}
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900 group-hover:text-[#3D2CA3] transition-colors duration-300 relative">
            {filteredBlogs[0].title}
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#3D2CA3] group-hover:w-full transition-all duration-500" />
          </h2>

          {/* Preview Text */}
          <p className="text-gray-600 text-lg mb-6 line-clamp-3 relative z-10">
            {getPreview(filteredBlogs[0].content)}
          </p>

          {/* Author Info and Read More */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              {/* Author Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D2CA3] to-[#6366F1] flex items-center justify-center text-white font-medium">
                {filteredBlogs[0].author.charAt(0)}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {filteredBlogs[0].author}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span>{filteredBlogs[0].readTime || "5 min read"}</span>
                  <span>·</span>
                  <span>{filteredBlogs[0].date || "May 15"}</span>
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div className="flex items-center gap-2 text-[#3D2CA3] font-medium">
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                Read More
              </span>
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
)}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.slice(1).map((blog) => (
          <article
            key={blog.id}
            onClick={() => navigate(`/blogs/${blog.id}`)}
            className="cursor-pointer group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h2 className="text-xl font-serif font-bold mb-3 group-hover:text-[#3D2CA3] 
-600 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {getPreview(blog.content)}
              </p>
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-500">
                    {blog.readTime || "5 min read"} · {blog.date || "May 15"}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;