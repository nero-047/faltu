import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 10;
  const offset = (page - 1) * perPage;

  try {
    const [result]: any = await pool.query(
      `
      SELECT 
        s.id,
        s.title,
        a.name AS author,
        s.tags,
        s.subject,
        LEFT(s.solution, 300) AS content,
        s.uploadDateTime
      FROM questions s
      JOIN admins a ON s.authorId = a.id
      WHERE s.solution IS NOT NULL
      ORDER BY s.uploadDateTime DESC
      LIMIT ? OFFSET ?
      `,
      [perPage, offset]
    );

    const [count]: any = await pool.query(
      `SELECT COUNT(*) AS total FROM questions WHERE solution IS NOT NULL`
    );

    const parsedResult = result.map((s: any) => ({
      ...s,
      tags: JSON.parse(s.tags),
    }));

    return NextResponse.json({
      solutions: parsedResult,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count[0].total / perPage),
      },
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
