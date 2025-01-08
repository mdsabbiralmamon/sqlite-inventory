import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  console.log('value token', token);
  console.log('value path name', pathname);
  

  // Define private routes
  const privateRoutes = [
    "/dashboard",
    "/signup",
  ];

  // Check if the requested route is a private route
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    // If no token exists, redirect to sign-in page
    if (!token) {
      const signInUrl = new URL("/signin", request.url);

      // Append the callback URL to redirect the user back after login
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // You can add additional checks for roles here (e.g., admin or editor)
    const allowedRoles = ["admin", "editor"]; // Example of multiple allowed roles
    if (!allowedRoles.includes(token.role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

// Match the paths for middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signup/:path*",
  ],
};
