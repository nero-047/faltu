import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../lib/db";

// Remove the custom PageParams interface and use Context directly

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  const { slug } = context.params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const [result]: any = await pool.query(
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
      [slug]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // Return the first blog
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}