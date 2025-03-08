"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import { getPaginatedBlogs } from "../../lib/fetchData";
import Pagination from "../../components/Pagenation";
import BlogCardShimmer from "../../components/BlogLoad";

// Define the type for the blog object
interface Blog {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image: string | null;
}

// Define the type for pagination
interface Pagination {
  totalPages: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Specify the Blog type
  const [pagination, setPagination] = useState<Pagination>({ totalPages: 1 }); // Specify the Pagination type
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { blogs, pagination } = await getPaginatedBlogs(currentPage);
      setBlogs(blogs);
      setPagination(pagination);
      setLoading(false);
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <main className="md:max-w-[70%] mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">📚 Blog Posts</h1>

      {/* Loading Shimmer */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardShimmer key={index}/>
          ))}
        </div>
      ) : (
        <>
          {/* Blog List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No blogs available.
              </p>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      )}
    </main>
  );
}