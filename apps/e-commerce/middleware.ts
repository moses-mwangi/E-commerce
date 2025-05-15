import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = [
    "/admins",
    "/pages/cart/checkout",
    "/pages/account",
    "/order",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("tokens")?.value;
  // req.cookies.get("token")?.value || req.cookies.get("tokens")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/registration/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admins/:path*",
    "/pages/cart/checkout/:path*",
    "/pages/account/:path*",
    "/order/:path*",
  ],
};
