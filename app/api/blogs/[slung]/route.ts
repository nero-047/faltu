import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";
import { RowDataPacket } from "mysql2/promise";

interface Blog extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  author: string;
  image: string | null;
  createdAt: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slung: string }> }
): Promise<NextResponse> {
  const { slung } = await params;

  if (!slung) {
    return NextResponse.json({ error: "Slung is required" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<Blog[] & RowDataPacket[]>(
      `SELECT 
        b.id, 
        b.title, 
        b.content, 
        a.name AS author, 
        b.image, 
        b.createdAt
      FROM blogs b
      JOIN admins a ON b.authorId = a.id
      WHERE b.id = ?`,
      [slung]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
