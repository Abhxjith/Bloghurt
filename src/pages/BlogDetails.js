import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, deleteBlog } from "../blogService";
import { Edit2, Trash2, ArrowLeft, Share2, BookmarkPlus, Sparkles, RefreshCw } from "lucide-react";import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlogById(id);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const generateAISummary = async () => {
    if (!blog) return;

    setSummaryLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Generate a concise, professional summary of the following blog post. Capture the main ideas and key points in 3-4 sentences:\n\n${blog.content}`;
      
      const result = await model.generateContent(prompt);
      const summary = await result.response.text();
      
      setAiSummary(summary);
    } catch (error) {
      console.error("Error generating AI summary:", error);
      alert("Failed to generate AI summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (confirm) {
      try {
        await deleteBlog(id);
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D2CA3]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h2>
        <button
          onClick={() => navigate("/")}
          className="text-[#3D2CA3] hover:text-[#3D2CA3]/90 font-medium flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} />
          Return to all stories
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>All stories</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Share2 size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <BookmarkPlus size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#3D2CA3]">
                <span className="text-white font-medium text-xl">
                  {blog.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{blog.author}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{formatDate(blog.date || new Date())}</span>
                  <span className="mx-2">·</span>
                  <span>{blog.readTime || "5 min read"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/edit-blog/${id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <Edit2 size={18} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 size={18} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 leading-relaxed">
            {blog.content}
          </p>
        </div>
      </article>

      <div className="mt-12 mb-8 bg-gradient-to-br from-[#3D2CA3]/10 to-[#3D2CA3]/5 border border-[#3D2CA3]/10 rounded-2xl py-8 px-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-[#3D2CA3] w-6 h-6" />
              <h3 className="text-2xl font-semibold text-[#3D2CA3]">
                AI-Powered Summary
              </h3>
            </div>
            <p className="text-center text-gray-600 mb-6 max-w-xl">
              Get a quick overview of the blog post generated by our AI assistant.
            </p>

            {/* Centered Button */}
            <div className="flex justify-center w-full">
              <button
                onClick={generateAISummary}
                disabled={summaryLoading}
                className="flex items-center gap-3 px-6 py-3 rounded-full 
                  bg-[#3D2CA3] text-white 
                  hover:bg-[#3D2CA3]/90 
                  focus:outline-none focus:ring-2 focus:ring-[#3D2CA3]/50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 ease-in-out
                  shadow-md hover:shadow-lg"
              >
                {summaryLoading ? (
                  <RefreshCw className="animate-spin" size={18} />
                ) : (
                  <Sparkles size={18} />
                )}
                <span>{summaryLoading ? "Generating..." : "Generate AI Summary"}</span>
              </button>
            </div>
          </div>

          {/* Summary Display */}
          {aiSummary && (
            <div className="mt-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <Sparkles className="text-[#3D2CA3] w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-[#3D2CA3] mb-2">
                    Summary Highlights
                  </h4>
                  <p className="text-gray-700 leading-relaxed italic">
                    {aiSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Bottom Actions */}
      <div className="max-w-3xl mx-auto px-4 py-8 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Add clap/like button here if needed */}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Share2 size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <BookmarkPlus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
