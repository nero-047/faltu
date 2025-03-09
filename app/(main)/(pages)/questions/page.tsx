"use client";

import { Suspense } from "react";
import QuestionsPage from "./QuestionsPage";

export default function QuestionsPageWrapper() {
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">💪 Questions</h1>
      <Suspense fallback={<div>Loading questions...</div>}>
        <QuestionsPage />
      </Suspense>
    </main>
  );
}
