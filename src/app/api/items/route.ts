import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database
const db = new sqlite3.Database("src/database/inventory.db");

// Handler for GET requests
export async function GET() {
  return new Promise<Response>((resolve) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows, { status: 200 }));
      }
    });
  });
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, quantity } = body;

  if (!name || !description || quantity === undefined) {
    return NextResponse.json(
      { error: "All fields (name, description, quantity) are required" },
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    db.run(
      "INSERT INTO items (name, description, quantity) VALUES (?, ?, ?)",
      [name, description, quantity],
      function (err) {
        if (err) {
          resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ id: this.lastID }, { status: 201 }));
        }
      }
    );
  });
}
