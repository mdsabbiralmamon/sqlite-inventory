import sqlite3 from "sqlite3";
import { NextResponse } from "next/server";

// Initialize the database
const db = new sqlite3.Database("src/database/inventory.db");

// Handler for GET requests
export async function GET() {
  return new Promise<Response>((resolve) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows, { status: 200 }));
      }
    });
  });
}