'use client'

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

interface Blog {
  title: string;
  author: string;
  createdAt: string;
  image: string | null;
  content: string;
}

function timeAgo(date: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month ago`;
  const years = Math.floor(days / 365);
  return `${years} year ago`;
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ slung: string }>;
}) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const resolvedParams = await params; // Resolve the Promise
      try {
        const res = await fetch(`/api/blogs/${resolvedParams.slung}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data: Blog = await res.json();
          setBlog(data);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [params]);

  if (loading) {
    return (
      <main className="container mx-auto px-6 py-10 animate-pulse">
        <div className="h-10 w-3/4 bg-gray-700 rounded-md mb-4"></div>
        <div className="h-5 w-1/5 bg-gray-600 rounded-md mb-6"></div>
        <div className="w-full h-[250px] md:h-[400px] bg-gray-800 rounded-lg shadow-md mb-6"></div>
        <article className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-700 rounded-md"></div>
          ))}
          <div className="h-4 w-5/6 bg-gray-700 rounded-md"></div>
        </article>
      </main>
    );
  }

  if (!blog) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-4 dark:text-white">{blog.title}</h1>
      <div className="text-gray-600 dark:text-gray-400 mb-6">
        <span>
          By {blog.author} • {timeAgo(blog.createdAt)}
        </span>
      </div>
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={800}
          className="w-full rounded-lg shadow-md mb-6"
        />
      )}
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {blog.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}