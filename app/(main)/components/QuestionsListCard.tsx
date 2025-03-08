import Link from "next/link";

// Define the type for the question object
interface Question {
  id: string;
  title: string;
  subject: string;
  tags?: string[];
  content: string;
  uploadDateTime: string;
  author?: string;
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
  return `${Math.floor(hours / 24)} day ago`;
}

export default function QuestionCard({ question }: { question: Question }) {
  if (!question) return null;

  const categoryColors: { [key: string]: string } = {
    DSA: "bg-blue-500 text-white",
    Math: "bg-green-500 text-white",
    Physics: "bg-purple-500 text-white",
    Default: "bg-gray-500 text-white",
  };

  const categoryClass =
    categoryColors[question.subject] || categoryColors["Default"];

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700">
      {/* Subject of the Question */}
      <div className="flex justify-between items-center">
        <Link
          href={`/questions/${question.id}`}
          className="text-blue-600 hover:underline"
        >
          <h3 className="text-xl font-bold hover:underline text-blue-400 line-clamp-2">
            {question.title}
          </h3>
        </Link>
        {question.subject && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold  ${categoryClass}`}
          >
            {question.subject}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {question.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-300 line-clamp-3 my-4">
        {question.content}
      </p>

      <div className="flex justify-between items-center">
        <Link
          href={`/questions/${question.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details →
        </Link>

        <p className="text-sm text-gray-400">
          Asked {timeAgo(question.uploadDateTime)}{" "}
          {question.author ? `by ${question.author}` : ""}
        </p>
      </div>
    </div>
  );
}