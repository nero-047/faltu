import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 10;

  if (page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  try {
    const [countResult]: any = await pool.query(
      "SELECT COUNT(*) as total FROM questions"
    );
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / perPage);

    if (totalPages === 0) {
      return NextResponse.json({
        questions: [],
        totalPages: 0,
      });
    }

    const offset = (page - 1) * perPage;

    const [result]: any = await pool.query(
      `SELECT 
  q.id,
  q.title,
  a.name AS author,
  q.tags,
  q.subject,
  q.uploadDateTime
FROM questions q
JOIN admins a ON q.authorId = a.id
WHERE q.uploadDateTime < NOW() -- Filter questions with uploadDateTime less than current datetime
GROUP BY q.id, a.name
ORDER BY q.uploadDateTime DESC
LIMIT ? OFFSET ?`,
      [perPage, offset]
    );

    const parsedResult = result.map((q: any) => ({
      ...q,
      tags: JSON.parse(q.tags.replace(/\\/g, "").replace(/\"/g, '"')),
    }));

    return NextResponse.json({
      questions: parsedResult,
      pagination: {
        totalPages: totalPages,
        currentPage: page,
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
