import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlog } from "../blogService";
import { 
  ArrowLeft, 
  Image as ImageIcon, 
  X, 
  Save,
  Info,
  ChevronDown
} from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
      category,
      date: new Date().toISOString(),
      status: isDraft ? 'draft' : 'published',
      readTime: `${Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read`
    };
    await addBlog(newBlog);
    navigate("/blogs");
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>All stories</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDraft(!isDraft)}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save size={20} />
            </button>
            <button
              type="submit"
              form="blog-form"
              className="bg-[#3D2CA3] hover:bg-[#3D2CA3]
 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {isDraft ? 'Save draft' : 'Publish now'}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleTitleKeyDown}
              required
              className="w-full text-4xl font-serif placeholder-gray-400 border-none focus:ring-0 px-0 bg-transparent"
            />

            {/* Author and Category */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Info size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="flex-1 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white transition-all appearance-none"
                >
                  <option value="">Select Category</option>
<option value="Technology">Technology</option>
<option value="Design">Design</option>
<option value="Business">Business</option>
<option value="Science">Science</option>
<option value="Health">Health</option>
<option value="Education">Education</option>
<option value="Finance">Finance</option>
<option value="Travel">Travel</option>
<option value="Sports">Sports</option>
<option value="Entertainment">Entertainment</option>
<option value="Food">Food</option>
<option value="Lifestyle">Lifestyle</option>
<option value="Art">Art</option>
<option value="Environment">Environment</option>
<option value="Politics">Politics</option>
<option value="History">History</option>
<option value="Psychology">Psychology</option>
<option value="Culture">Culture</option>
<option value="Other">Other</option>

                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="border-t border-gray-100 pt-6">
            

            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full min-h-[500px] text-lg leading-relaxed placeholder-gray-400 border-none focus:ring-0 px-0 bg-transparent resize-none font-serif"
            />
          </div>
        </form>
      </div>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
            <span>·</span>
            <span>{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDraft(!isDraft)}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isDraft ? 'Draft' : 'Ready to publish'}
            </button>
            <button
              type="submit"
              form="blog-form"
              className="bg-[#3D2CA3] hover:bg-[#3D2CA3]
 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isDraft ? 'Save draft' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CreateBlog;