import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { RowDataPacket } from "mysql2/promise";

// Define the interface for a question
interface Question extends RowDataPacket {
  id: string;
  title: string;
  content: string;
  tags: string | null;
  subject: string;
  uploadDateTime: string;
  authorId: number;
  solution?: string | null;
  solutionDate?: string | null;
  createdAt: string;
  author: string;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }  // Note the Promise wrapper
): Promise<NextResponse> {
  const { id } = await context.params; // Await the params

  if (!id) {
    return NextResponse.json({ error: "Missing question ID" }, { status: 400 });
  }

  // Ensure the ID is a valid UUID (optional)
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return NextResponse.json(
      { error: "Invalid question ID format" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.query<Question[] & RowDataPacket[]>(
      `
      SELECT questions.*, admins.name AS author 
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
    question.tags = question.tags ? JSON.parse(question.tags) : [];

    return NextResponse.json(question);
  } catch (error) {
    console.error("Question API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
