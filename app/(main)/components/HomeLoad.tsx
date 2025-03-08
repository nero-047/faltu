const HomePageShimmer = () => {
  return (
    <main className="md:max-w-[70%] mx-auto px-6 py-10 animate-pulse">
      {/* Questions Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-32 bg-gray-700 rounded-md"></div> {/* Title */}
          <div className="h-6 w-20 bg-gray-600 rounded-md"></div> {/* View All */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700"
            >
              <div className="h-6 w-3/4 bg-gray-700 rounded-md"></div> {/* Title */}
              <div className="h-5 w-16 bg-gray-700 rounded-full mt-2"></div>{" "}
              {/* Subject */}
              <div className="h-4 w-12 bg-gray-700 rounded-full mt-2"></div>{" "}
              {/* Tag */}
              <div className="h-4 w-full bg-gray-700 rounded-md mt-4"></div>{" "}
              {/* Content */}
              <div className="h-5 w-24 bg-gray-600 rounded-md mt-4"></div>{" "}
              {/* View Details */}
            </div>
          ))}
        </div>
      </section>

      {/* Blogs & Recent Solutions Section */}
      <section className="mt-12 flex flex-col lg:flex-row gap-10">
        {/* Blogs Section */}
        <div className="lg:w-[70%]">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-700 rounded-md"></div> {/* Title */}
            <div className="h-6 w-20 bg-gray-600 rounded-md"></div> {/* View All */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700 w-full flex flex-col"
              >
                <div className="w-full h-[180px] bg-gray-800 rounded-md"></div>{" "}
                {/* Image */}
                <div className="p-4 flex flex-col">
                  <div className="h-6 w-3/4 bg-gray-700 rounded-md"></div>{" "}
                  {/* Title */}
                  <div className="h-4 w-1/2 bg-gray-700 rounded-md mt-2"></div>{" "}
                  {/* Time */}
                  <div className="h-4 w-full bg-gray-700 rounded-md mt-4"></div>{" "}
                  {/* Content */}
                  <div className="h-4 w-5/6 bg-gray-700 rounded-md mt-2"></div>
                  <div className="h-8 w-24 bg-gray-600 rounded-lg mt-4"></div>{" "}
                  {/* Button */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Solutions Section */}
        <div className="lg:w-[30%] sticky top-20">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-700 rounded-md"></div> {/* Title */}
            <div className="h-6 w-20 bg-gray-600 rounded-md"></div> {/* View All */}
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700"
              >
                <div className="h-6 w-3/4 bg-gray-700 rounded-md"></div>{" "}
                {/* Title */}
                <div className="h-4 w-full bg-gray-700 rounded-md mt-4"></div>{" "}
                {/* Content */}
                <div className="h-4 w-5/6 bg-gray-700 rounded-md mt-2"></div>
                <div className="h-5 w-24 bg-gray-600 rounded-md mt-4"></div>{" "}
                {/* View Details */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePageShimmer;