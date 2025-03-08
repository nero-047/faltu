import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-300">
        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}