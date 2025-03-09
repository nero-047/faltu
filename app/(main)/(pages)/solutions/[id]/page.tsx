"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Define the type for the question
interface Question {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  subject: string;
  category: string;
  tags: string[];
  solution: string;
}

export default function SolutionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [question, setQuestion] = useState<Question | null>(null); // Use Question type
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      const res = await fetch(`/api/solutions/${id}`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setQuestion(data);
        console.log(data);
      } else {
        setQuestion(null);
      }
      setLoading(false);
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!question) {
    return notFound(); // Shows Next.js default 404 page if question is not found
  }

  const categoryColors: { [key: string]: string } = {
    DSA: "bg-blue-500 text-white",
    Math: "bg-green-500 text-white",
    Physics: "bg-purple-500 text-white",
    Default: "bg-gray-500 text-white",
  };

  const categoryClass =
    categoryColors[question.category] || categoryColors["Default"];

  return (
    <main className="container mx-auto px-6 py-10 h-full">
      {/* Question Title */}
      <h1 className="text-4xl font-bold mb-4 dark:text-white">
        {question.title}
      </h1>

      {/* Question Meta */}
      <div className="flex items-center gap-x-2 mb-2">
        <div className="text-gray-600 dark:text-gray-400">
          <span>
            By {question.author} •{" "}
            {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryClass}`}
        >
          {question.subject}
        </span>
      </div>
      <div className="my-3 flex flex-wrap gap-2">
        {Array.isArray(question.tags) && question.tags.length > 0 ? (
          question.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs">No tags</span>
        )}
      </div>

      {/* Question Content */}
      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {question.solution}
        </ReactMarkdown>
      </article>
    </main>
  );
}
