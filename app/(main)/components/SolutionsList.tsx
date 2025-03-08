import Link from "next/link";

// Define the type for the solution object
interface Solution {
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

export default function SolutionCard({ solution }: { solution: Solution }) {
  if (!solution) return null;

  const categoryColors: { [key: string]: string } = {
    DSA: "bg-blue-500 text-white",
    Math: "bg-green-500 text-white",
    Physics: "bg-purple-500 text-white",
    Default: "bg-gray-500 text-white",
  };

  const categoryClass =
    categoryColors[solution.subject] || categoryColors["Default"];

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700">
      {/* Subject of the solution */}
      <div className="flex justify-between items-center">
        <Link
          href={`/solutions/${solution.id}`}
          className="text-blue-600 hover:underline"
        >
          <h3 className="text-xl font-bold hover:underline text-blue-400 line-clamp-2">
            {solution.title}
          </h3>
        </Link>
        {solution.subject && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold  ${categoryClass}`}
          >
            {solution.subject}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {solution.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-300 line-clamp-2 my-4">
        {solution.content
          .replace(/[#_*`~>\-![\]$]/g, "") // Remove Markdown symbols
          .replace(/\n+/g, " ") // Convert new lines to spaces
          .replace(/\\+/g, "") // Remove unnecessary escape slashes
          .trim()}
      </p>

      <div className="flex justify-between items-center">
        <Link
          href={`/solutions/${solution.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details →
        </Link>

        <p className="text-sm text-gray-400">
          {solution.author ? `By ${solution.author}` : "unknown"}{" "}
          {timeAgo(solution.uploadDateTime)}{" "}
        </p>
      </div>
    </div>
  );
}