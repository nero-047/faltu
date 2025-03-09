import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";
import { RowDataPacket } from "mysql2/promise"; // Ensure proper type handling

// Define Blog and Pagination types
interface Blog extends RowDataPacket {
  id: number;
  title: string;
  author: string;
  image: string | null;
  content: string;
  uploadDateTime: string;
}

interface CountResult extends RowDataPacket {
  count: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;
  const offset = (page - 1) * perPage;

  try {
    // Query for blogs
    const [rows] = await pool.query<Blog[] & RowDataPacket[]>(
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
      LIMIT ? OFFSET ?`,
      [perPage, offset]
    );

    // Query for total count
    const [totalRows] = await pool.query<CountResult[] & RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM blogs`
    );

    return NextResponse.json({
      blogs: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRows[0].count / perPage),
      } as Pagination,
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
