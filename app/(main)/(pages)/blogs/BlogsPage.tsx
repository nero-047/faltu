"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import { getPaginatedBlogs } from "../../lib/fetchData";
import Pagination from "../../components/Pagenation";
import BlogCardShimmer from "../../components/BlogLoad";

// Define the type for the blog object
interface Blog {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  image: string | null;
  uploadDateTime: string;
}

// Define the type for pagination
interface PaginationType {
  totalPages: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({ totalPages: 1 });
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BlogCardShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No blogs available.</p>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
    </>
  );
}
