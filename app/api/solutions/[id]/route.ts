import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";

interface PageParams {
  params: { id: string };
}

export async function GET(
  req: NextRequest,
  { params }: PageParams
) {
  const { id } = await params; // Await the params

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const [rows]: any = await pool.query(
      `
      SELECT questions.*, admins.name AS author
      FROM questions
      JOIN admins ON questions.authorId = admins.id 
       WHERE questions.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
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
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}