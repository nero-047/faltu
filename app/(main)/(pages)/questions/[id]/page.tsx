"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css"; // Optional Dark Theme

// Define the type for the question
interface Question {
  id: string;
  title: string;
  author: string;
  uploadDateTime: string;
  tags: string[];
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

export default function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // This unwraps the Promise
  const [question, setQuestion] = useState<Question | null>(null); // Use the Question type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        const res = await fetch(`/api/questions/${id}`, { cache: "no-store" });

        if (res.ok) {
          const data = await res.json();
          setQuestion(data);
        } else {
          setQuestion(null);
        }
      } catch (error) {
        console.error("API Error:", error);
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
    return notFound(); // Shows Next.js default 404 page
  }

  return (
    <main className="container mx-auto px-6 py-10 h-full">
      <h1 className="text-4xl font-bold mb-4 text-white">{question.title}</h1>
      <div className="text-gray-400 mb-4">
        By {question.author} • {timeAgo(question.uploadDateTime)}
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

      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {question.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}