import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

// Initialize the database
const db = new sqlite3.Database("src/database/inventory.db");

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}

const handler = NextAuth({
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 60, // 30 minutes
    updateAge: 5 * 60, // 5 minutes
  },
  pages: {
    // signIn: "/signin",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Query the database for the user
        return new Promise((resolve, reject) => {
          db.get("SELECT * FROM users WHERE email = ?", [credentials.email], async (err, row) => {
            if (err || !row) {
              reject(new Error("Invalid email or password."));
            } else {
              const user = row as User;

              // Compare the password with the hashed password
              const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
              if (isPasswordValid) {
                resolve({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                });
              } else {
                reject(new Error("Invalid email or password."));
              }
            }
          });
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = typeof token.id === "string" ? Number(token.id) : token.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure id is always treated as a number
        session.user.id = typeof token.id === "string" ? Number(token.id) : token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
