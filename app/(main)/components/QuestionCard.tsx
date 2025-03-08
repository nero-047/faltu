import Link from "next/link";

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

// Define a specific type for the question object
interface Question {
  id: string;
  title: string;
  subject: string;
  category: string;
  tags: string | null;
  uploadDateTime: string;
  createdAt: string;
  author?: string;
}

export default function QuestionCard({
  question,
  showAuthor = false,
  isRecentSolution = false,
}: {
  question: Question;
  showAuthor?: boolean;
  isRecentSolution?: boolean;
}) {
  if (!question) return null;

  // Define category colors
  const categoryColors: { [key: string]: string } = {
    DSA: "bg-blue-500 text-white",
    Math: "bg-green-500 text-white",
    Physics: "bg-purple-500 text-white",
    Default: "bg-gray-500 text-white",
  };

  const categoryClass =
    categoryColors[question.category] || categoryColors["Default"];

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700 flex flex-col justify-between">
      <div>
        {/* Title & Category */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold line-clamp-2">
            {question.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryClass}`}
          >
            {question.subject}
          </span>
        </div>

        <p className="text-sm text-gray-400">
          {showAuthor ? `${timeAgo(question.uploadDateTime)}` : ""}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {question.tags && question.tags.length > 0 ? (
            JSON.parse(question.tags).map((tag: string, index: number) => (
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
      </div>

      {/* Meta Info (Time & Author) */}
      <div className="flex justify-between items-center mt-4">
        <Link
          href={`/questions/${question.id}`}
          className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          {isRecentSolution ? "View Solution" : "View Question"} →
        </Link>
        <p className="text-sm text-gray-400">
          {showAuthor
            ? `by ${question.author}`
            : `${timeAgo(question.createdAt)}`}
        </p>
      </div>
    </div>
  );
}