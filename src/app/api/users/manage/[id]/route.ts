import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

// Initialize the database
const db = new sqlite3.Database("src/database/inventory.db");

// Handler for PUT requests (Update)
export async function PUT(req: NextRequest) {
  const { id, name, email, password, role } = await req.json();

  if (!id || !name || !email || !password || !role) {
    return NextResponse.json(
      { error: "All fields (id, name, email, password, role) are required" },
      { status: 400 }
    );
  }

  try {
    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return new Promise((resolve) => {
      db.run(
        "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
        [name, email, hashedPassword, role, id],
        function (err) {
          if (err) {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          } else if (this.changes === 0) {
            resolve(
              NextResponse.json({ error: "User not found" }, { status: 404 })
            );
          } else {
            resolve(NextResponse.json({ message: "User updated" }, { status: 200 }));
          }
        }
      );
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// Handler for DELETE requests (Delete)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;  // Get the ID from URL params
  
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
  
    return new Promise((resolve) => {
      db.run(
        "DELETE FROM users WHERE id = ?",
        [id],
        function (err) {
          if (err) {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          } else if (this.changes === 0) {
            resolve(
              NextResponse.json({ error: "User not found" }, { status: 404 })
            );
          } else {
            resolve(NextResponse.json({ message: "User deleted" }, { status: 200 }));
          }
        }
      );
    });
  }
