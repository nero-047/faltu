import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 10;

  const offset = (page - 1) * perPage;

  try {
    const [result]: any = await pool.query(
      `
      SELECT 
        b.id,
        b.title,
        a.name AS author,
        b.image,
        LEFT(b.content, 200) AS content,
        b.uploadDateTime
      FROM blogs b
      JOIN admins a ON b.authorId = a.id
      ORDER BY b.uploadDateTime DESC
      LIMIT ? OFFSET ?
      `,
      [perPage, offset]
    );

    const [total]: any = await pool.query(
      `SELECT COUNT(*) AS count FROM blogs`
    );

    return NextResponse.json({
      blogs: result,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total[0].count / perPage),
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
