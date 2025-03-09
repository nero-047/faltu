"use client";

import { Suspense } from "react";
import BlogsPage from "./BlogsPage";

export default function BlogsPageWrapper() {
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">📚 Blog Posts</h1>
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogsPage />
      </Suspense>
    </main>
  );
}
