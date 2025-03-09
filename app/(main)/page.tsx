"use client";

import { useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import BlogCard from "./components/BlogCard";
import SolutionCard from "./components/SolutoinCard"; // Ensure it's named correctly
import { getHomeData } from "./lib/fetchData";
import Link from "next/link";
import HomePageShimmer from "./components/HomeLoad";

type Question = {
  id: string;
  title: string;
  createdAt: string;
  author: string;
  category: string;
  subject: string;
  tags: string;
  uploadDateTime: string;
};

type Blog = {
  id: string;
  title: string;
  createdAt: string;
  author: string;
  content: string;
  uploadDateTime: string;
};

type Solution = {
  id: string;
  title: string;
  createdAt: string;
  author: string;
  solution: string;
  tags: string[];
  questionId: string;
  uploadDateTime: string;
  subject: string;
};

type HomeData = {
  blogs: Blog[];
  questions: Question[];
  solutions: Solution[];
};

export default function Home() {
  const [data, setData] = useState<HomeData>({
    blogs: [],
    questions: [],
    solutions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getHomeData();
      console.log(result);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <HomePageShimmer />;
  }

  return (
    <main className="container mx-auto px-6 py-10">
      {/* Questions Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🔥 Questions</h2>
          <Link href="/questions" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.questions.length > 0 ? (
            data.questions.map((q: Question) => (
              <QuestionCard key={q.id} question={q} showAuthor={true} />
            ))
          ) : (
            <p className="text-gray-500">No questions available.</p>
          )}
        </div>
      </section>

      {/* Blogs & Recent Solutions Section */}
      <section className="mt-12 flex flex-col lg:flex-row gap-10">
        {/* Blogs Section */}
        <div className="lg:w-[70%]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📝 Latest Blogs</h2>
            <Link href="/blogs" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {data.blogs.length > 0 ? (
              data.blogs.map((blog: Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-gray-500">No blogs available yet.</p>
            )}
          </div>
        </div>

        {/* Recent Solutions Section */}
        <div className="lg:w-[30%] sticky top-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">✅ Recent Solutions</h2>
            <Link href="/solutions" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-6">
            {data.solutions.length > 0 ? (
              data.solutions.map((solution: Solution) => (
                <SolutionCard key={solution.id} question={solution} />
              ))
            ) : (
              <p className="text-gray-500">No recent solutions available.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}