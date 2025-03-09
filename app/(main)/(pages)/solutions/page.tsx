// app/(main)/(pages)/solutions/page.tsx
"use client";

import { Suspense } from "react";
import SolutionsPage from "./SolutionsPage";


export default function SolutionsPageWrapper() {
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">✅ Solutions</h1>
      <Suspense fallback={<div>Loading solutions...</div>}>
        <SolutionsPage />
      </Suspense>
    </main>
  );
}
