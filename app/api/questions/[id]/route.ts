import { NextResponse } from "next/server";
import pool from "../../../lib/db";

interface PageParams {
  params: { id: string };
}


export async function GET(
  req: Request,
  { params }: PageParams
) {
  const { id } = params;

  try {
    const [rows]: any = await pool.query(
      `SELECT questions.*, admins.name AS author 
       FROM questions 
       JOIN admins ON questions.authorId = admins.id 
       WHERE questions.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const question = rows[0];

    // Parse tags if they are not null
    if (question.tags) {
      try {
        question.tags = JSON.parse(question.tags);
      } catch (error) {
        question.tags = [];
      }
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Question API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
