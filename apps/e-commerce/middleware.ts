import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let serverToken: string | undefined = undefined;

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/admin", "/cart", "/pages", "/account", "/orders"];
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
    "/admin/:path*",
    "/cart/:path*",
    "/pages/:path*",
    "/account/:path*",
    "/orders/:path*",
  ], // Match protected routes
};
