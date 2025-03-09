// app/(main)/(pages)/solutions/SolutionsPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SolutionsList from "../../components/SolutionsList";
import { getPaginatedSolutions } from "../../lib/fetchData";
import Pagination from "../../components/Pagenation";
import SolutionCardShimmer from "../../components/SolutionsLoad";

// Define the Solution type
interface Solution {
  id: string;
  title: string;
  author: string;
  tags: string[];
  createdAt: string;
  questionId: string;
  solutionText: string; // Use the correct field name for solution text
  subject: string;
  content: string;
  uploadDateTime: string;
}

// Define the type for pagination
interface PaginationData {
  totalPages: number;
}

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchSolutions = async () => {
      setLoading(true);
      const { solutions, pagination } = await getPaginatedSolutions(currentPage);
      setSolutions(solutions);
      setPagination(pagination);
      setLoading(false);
    };

    fetchSolutions();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(6)].map((_, i) => (
          <SolutionCardShimmer key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {solutions.length > 0 ? (
          solutions.map((solution) => (
            <SolutionsList key={"solutions" + solution.id} solution={solution} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No solutions available.
          </p>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
    </>
  );
}
