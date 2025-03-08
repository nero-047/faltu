const BlogCardShimmer = () => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700 w-full flex flex-col animate-pulse">
      {/* Blog Thumbnail Placeholder */}
      <div className="w-full h-[180px] bg-gray-800 rounded-md"></div>

      {/* Blog Info (Title & Content) */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mt-3 flex-grow">
          <div className="h-6 w-3/4 bg-gray-700 rounded-md"></div> {/* Title Placeholder */}
          <div className="h-4 w-1/2 bg-gray-700 rounded-md mt-2"></div> {/* Time Placeholder */}
          <div className="h-4 w-full bg-gray-700 rounded-md mt-4"></div> {/* Content Line 1 */}
          <div className="h-4 w-full bg-gray-700 rounded-md mt-2"></div> {/* Content Line 2 */}
          <div className="h-4 w-5/6 bg-gray-700 rounded-md mt-2"></div> {/* Content Line 3 */}
        </div>

        {/* Meta Info & Read More Button Placeholder */}
        <div className="mt-3 flex justify-between items-center">
          <div className="h-8 w-24 bg-gray-600 rounded-lg"></div> {/* Read More Button Placeholder */}
          <div className="h-4 w-20 bg-gray-600 rounded-md"></div> {/* Author Placeholder */}
        </div>
      </div>
    </div>
  );
};

export default BlogCardShimmer;