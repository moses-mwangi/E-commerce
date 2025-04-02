import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let serverToken: string | undefined = undefined;

export function middleware(req: NextRequest) {
  const protectedRoutes = [
    "/admins",
    "/carts",
    "/pagess",
    "/account",
    "/orderss",
  ];
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      serverToken = token;
      console.log("Redirecting to /login...");
      return NextResponse.redirect(new URL("/registration/signin", req.url));
    }
  }

  return NextResponse.next();
}
export default serverToken;
export const config = {
  matcher: [
    "/admins/:path*",
    "/carts/:path*",
    "/pagess/:path*",
    "/accounts/:path*",
    "/orderss/:path*",
  ], // Match protected routes
};
