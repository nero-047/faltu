import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { RowDataPacket } from "mysql2/promise"; // Import MySQL types

// Define the interface for a Question
interface Question extends RowDataPacket {
  id: number;
  title: string;
  author: string;
  tags: string | null;
  subject: string;
  uploadDateTime: string;
}

// Response structure for pagination
interface PaginatedResponse {
  questions: Question[];
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const perPage = 10;

    if (page < 1) {
      return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
    }

    // Get the total count of questions
    const [countResult] = await pool.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM questions"
    );
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / perPage);

    if (totalPages === 0) {
      return NextResponse.json<PaginatedResponse>({
        questions: [],
        pagination: { totalPages: 0, currentPage: page },
      });
    }

    const offset = (page - 1) * perPage;

    // Fetch paginated questions
    const [result] = await pool.query<Question[] & RowDataPacket[]>(
      `SELECT 
          q.id,
          q.title,
          a.name AS author,
          q.tags,
          q.subject,
          q.uploadDateTime
      FROM questions q
      JOIN admins a ON q.authorId = a.id
      WHERE q.uploadDateTime < NOW()
      GROUP BY q.id, a.name
      ORDER BY q.uploadDateTime DESC
      LIMIT ? OFFSET ?`,
      [perPage, offset]
    );

    // Parse tags safely
    const parsedResult = result.map((q) => ({
      ...q,
      tags: q.tags ? JSON.parse(q.tags) : [],
    }));

    return NextResponse.json<PaginatedResponse>({
      questions: parsedResult,
      pagination: { totalPages, currentPage: page },
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
