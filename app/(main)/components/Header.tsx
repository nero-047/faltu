"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({ subsets: ["latin"] });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`bg-gray-900 shadow-md fixed top-0 w-full transition-transform duration-300 z-10`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`text-3xl font-bold text-orange-600 ${dancingScript.className}`}
        >
          <span>Faltu</span>
          <span className="text-zinc-50">Site</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/questions"
            className=":text-gray-300 hover:text-blue-400"
          >
            Questions
          </Link>
          <Link
            href="/blogs"
            className="text-gray-300 hover:text-blue-400"
          >
            Blogs
          </Link>
          <Link
            href="/about-us"
            className="text-gray-300 hover:text-blue-400"
          >
            About us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          {menuOpen ? (
            <FiX className="text-white" />
          ) : (
            <FiMenu className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              href="/questions"
              className="text-gray-300 hover:text-blue-400"
            >
              Questions
            </Link>
            <Link
              href="/blogs"
              className="text-gray-300 hover:text-blue-400"
            >
              Blogs
            </Link>
            <Link
              href="/about-us"
              className="text-gray-300 hover:text-blue-400"
            >
              About us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}