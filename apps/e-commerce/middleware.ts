import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let serverToken: string | undefined = undefined;

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/admin", "/cart", "/account", "/order"];
  const token = req.cookies.get("token")?.value;
  const tokens = req.cookies.get("tokens")?.value;

  console.log("Tokens", token);

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      serverToken = token || tokens;
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
    "/pagess/:path*",
    "/account/:path*",
    "/order/:path*",
  ], // Match protected routes
};
