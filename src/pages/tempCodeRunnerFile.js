{/* Featured Post */}
      {filteredBlogs.length > 0 && (
        <div className="mb-12">
          <article
            onClick={() => navigate(`/blogs/${filteredBlogs[0].id}`)}
            className="cursor-pointer group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-[#3D2CA3] 
-600">
              {filteredBlogs[0].title}
            </h2>
            <p className="text-gray-600 mb-4">
              {getPreview(filteredBlogs[0].content)}
            </p>
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{filteredBlogs[0].author}</p>
                <p className="text-sm text-gray-500">
                  {filteredBlogs[0].readTime || "5 min read"} · {filteredBlogs[0].date || "May 15"}
                </p>
              </div>
            </div>
          </article>
        </div>
      )}
