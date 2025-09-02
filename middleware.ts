import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // This is a placeholder. In a real app, you'd check for a user session.
  // For now, it just logs the path and lets the request through.
  console.log("Middleware executed for:", request.nextUrl.pathname);
  return NextResponse.next();
}

// See "Matching Paths" in the Next.js docs to learn more
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};