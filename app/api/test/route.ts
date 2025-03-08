import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    return NextResponse.json({ success: true, rows });
  } catch (error: any) {
    console.error("DB Error: ", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}