import { NextResponse } from "next/server";
import pool from "../../lib/db";

export async function GET() {
  try {
    // Fetch Latest Blogs (3 Blogs with 100 characters of content + Author Name)
    const [blogs]: any = await pool.query(
      `SELECT blogs.id, blogs.title, blogs.image, LEFT(blogs.content, 200) AS content, blogs.uploadDateTime, admins.name AS author 
       FROM blogs 
       JOIN admins ON blogs.authorId = admins.id 
       WHERE blogs.uploadDateTime <= NOW() 
       ORDER BY blogs.uploadDateTime DESC 
       LIMIT 3`
    );

    // Fetch Latest Questions (2 Questions + Author Name)
    const [questions]: any = await pool.query(
      `SELECT questions.id, questions.title, questions.tags, questions.subject, questions.uploadDateTime, admins.name AS author 
       FROM questions 
       JOIN admins ON questions.authorId = admins.id 
       ORDER BY questions.uploadDateTime DESC 
       LIMIT 3`
    );

    // Fetch Recent Solutions (3 Questions whose solution is visible + Author Name)
    const [solutions]: any = await pool.query(
      `SELECT questions.id, questions.title, questions.tags, questions.subject, questions.createdAt, admins.name AS author 
       FROM questions 
       JOIN admins ON questions.authorId = admins.id 
       WHERE questions.solution IS NOT NULL 
       AND questions.solutionDate <= NOW() 
       ORDER BY questions.solutionDate DESC 
       LIMIT 3`
    );

    return NextResponse.json({
      blogs,
      questions,
      solutions,
    });
  } catch (error) {
    console.error("Home API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}