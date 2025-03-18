import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/admin", "/account", "/orders"];
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      console.log("Redirecting to /login...");
      return NextResponse.redirect(new URL("/registration/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/orders/:path*"], // Match protected routes
};
