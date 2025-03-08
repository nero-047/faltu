"use server";

import { headers } from "next/headers";

export async function getPaginatedBlogs(page: number = 1) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/blogs?page=${page}`, {
    cache: "no-store",
  });
  return res.ok ? res.json() : [];
}

export async function getBlogBySlug(slung: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/blogs/${slung}`, {
    cache: "no-store",
  });
  return res.ok ? res.json() : [];
}

export async function getPaginatedQuestions(page: number = 1) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/questions?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch paginated questions");
  return res.ok ? res.json() : [];
}

export async function getQuestionById(id: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/question/${id}`);
  if (!res.ok) throw new Error("Failed to fetch paginated questions");
  return res.ok ? res.json() : [];
}

export async function getPaginatedSolutions(page: number = 1) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/solutions?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch paginated questions");
  return res.ok ? res.json() : [];
}

export async function getHomeData() {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/home`);
  if (!res.ok) throw new Error("Failed to fetch home data");
  return res.ok ? res.json() : [];
}