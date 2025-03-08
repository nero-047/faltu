const SolutionCardShimmer = () => {
    return (
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700 animate-pulse">
        {/* Title & Subject Placeholder */}
        <div className="flex justify-between items-center">
          <div className="h-7 w-3/4 bg-gray-700 rounded-md"></div> {/* Title */}
          <div className="h-5 w-16 bg-gray-700 rounded-full"></div> {/* Subject */}
        </div>
  
        {/* Tags Placeholder */}
        <div className="flex gap-2 mt-4">
          <div className="h-4 w-12 bg-gray-700 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-700 rounded-full"></div>
          <div className="h-4 w-14 bg-gray-700 rounded-full"></div>
        </div>
  
        {/* Content Placeholder */}
        <div className="h-4 w-full bg-gray-700 rounded-md mt-4"></div>
        <div className="h-4 w-full bg-gray-700 rounded-md mt-2"></div>
  
        {/* Footer Placeholder */}
        <div className="flex justify-between items-center mt-8">
          <div className="h-5 w-24 bg-gray-600 rounded-md"></div> {/* View Details */}
          <div className="h-4 w-36 bg-gray-600 rounded-md"></div> {/* Time & Author */}
        </div>
      </div>
    );
  };
  
  export default SolutionCardShimmer;