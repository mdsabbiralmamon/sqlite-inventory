import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

// Initialize the database
const db = new sqlite3.Database("/tmp/inventory.db");

// Handler for POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { error: "All fields (name, email, password, role) are required" },
      { status: 400 }
    );
  }

  try {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new Promise<Response>((resolve) => {
      db.run(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, role],
        function (err) {
          if (err) {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ id: this.lastID }, { status: 201 }));
          }
        }
      );
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
