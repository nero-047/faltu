import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js

// Define the Blog type
interface Blog {
  id: string;
  title: string;
  content: string;
  uploadDateTime: string;
  image?: string | null;
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

export default function BlogCard({ blog }: { blog: Blog }) {
  if (!blog) return null;

  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition bg-gray-900 border-gray-700 w-full flex flex-col">
      {/* Blog Thumbnail */}
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800} // Add width for Image optimization
          height={180} // Add height for Image optimization
          className="rounded-md w-full h-[180px] object-cover"
        />
      )}

      {/* Blog Info (Title & Content) */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mt-3 flex-grow">
          <h3 className="text-lg font-semibold line-clamp-2">{blog.title}</h3>
          <span className="text-sm text-gray-400">
            {timeAgo(blog.uploadDateTime)}
          </span>
          <p className="text-gray-300 line-clamp-3 my-4">
            {blog.content
              .replace(/[#_*`~>\-![\]$]/g, "") // Remove Markdown symbols
              .replace(/\n+/g, " ") // Convert new lines to spaces
              .replace(/\\+/g, "") // Remove unnecessary escape slashes
              .trim()}
          </p>
        </div>

        {/* Meta Info & Read More Button (Sticks to Bottom) */}
        <div className="mt-3 flex justify-between items-center">
          <Link
            href={`/blogs/${blog.id}`}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Read More →
          </Link>
          <span className="text-sm text-gray-400">
            {blog.author ? ` • by ${blog.author}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}