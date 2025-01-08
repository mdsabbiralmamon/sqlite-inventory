import sqlite3 from "sqlite3";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database
const db = new sqlite3.Database("/tmp/inventory.db");

// Handler for PUT requests (Update an item by ID)
export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { name, description, quantity } = await req.json();

  // Validate input
  if (!name || !description || quantity === undefined) {
    return NextResponse.json(
      { error: "All fields (name, description, quantity) are required" },
      { status: 400 }
    );
  }

  return new Promise<Response>((resolve) => {
    db.run(
      "UPDATE items SET name = ?, description = ?, quantity = ? WHERE id = ?",
      [name, description, quantity, id],
      function (err) {
        if (err) {
          resolve(NextResponse.json({ error: err.message }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ updated: this.changes }, { status: 200 }));
        }
      }
    );
  });
}

// Handler for DELETE requests (Delete an item by ID)
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return new Promise<Response>((resolve) => {
    db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
      if (err) {
        resolve(NextResponse.json({ error: err.message }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ deleted: this.changes }, { status: 200 }));
      }
    });
  });
}