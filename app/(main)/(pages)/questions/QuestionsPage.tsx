"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuestionCard from "../../components/QuestionsListCard";
import { getPaginatedQuestions } from "../../lib/fetchData";
import Pagination from "../../components/Pagenation";
import QuestionCardShimmer from "../../components/QuestionsLoad";

// Define the type for a single Question
interface Question {
  id: string;
  title: string;
  author: string;
  uploadDateTime: string;
  tags: string[];
  content: string;
  subject: string;
}

// Define the type for pagination
interface PaginationData {
  totalPages: number;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { questions, pagination } = await getPaginatedQuestions(currentPage);
      setQuestions(questions);
      setPagination(pagination);
      setLoading(false);
    };

    fetchQuestions();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(6)].map((_, i) => (
          <QuestionCardShimmer key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No questions available.</p>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
    </>
  );
}
