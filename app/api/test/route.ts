import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    return NextResponse.json({ success: true, rows });
  } catch (error) {
    console.error("DB Error: ", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
