import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

// Initialize the database
const db = new sqlite3.Database("src/database/inventory.db");

// Define a type for the user
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  try {
    return new Promise((resolve) => {
      db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, row) => {
          if (err) {
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
          } else if (!row) {
            resolve(
              NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
              )
            );
          } else {
            // Cast the retrieved row to the User type
            const user = row as User;

            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
              resolve(
                NextResponse.json(
                  { message: "Login successful!", user: { id: user.id, name: user.name, role: user.role } },
                  { status: 200 }
                )
              );
            } else {
              resolve(
                NextResponse.json(
                  { error: "Invalid email or password." },
                  { status: 401 }
                )
              );
            }
          }
        }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
