import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, updateBlog } from "../blogService"; // Importing required services

const EditBlog = () => {
  const { id } = useParams(); // Retrieve the blog ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(""); // To handle errors

  // Fetch the existing blog data from Firebase
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id); // Get blog by ID from Firestore
        setTitle(blog.title);
        setContent(blog.content);
      } catch (error) {
        setError("Failed to fetch blog details");
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the blog in Firebase
      await updateBlog(id, { title, content });
      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`); // Redirect to the blog details page
    } catch (error) {
      setError("Failed to update the blog");
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg h-40"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
