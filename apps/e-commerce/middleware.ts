import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const adminPathRegex = /^\/admin(?:\/.*)?$/;
const protectedRoutes = [
  "/admin",
  "/pages/cart/checkout",
  "/pages/account",
  "/pages/order",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = req.cookies.get("tokens")?.value;
  // req.cookies.get("token")?.value || req.cookies.get("tokens")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/registration/signin", req.url));
  }

  const base64Payload = token.split(".")[1];
  const payload = JSON.parse(atob(base64Payload));

  // if (pathname.startsWith("/admin") && payload.tradeRole !== "admin") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/pages/cart/checkout/:path*",
    "/pages/account/:path*",
    "/pages/order/:path*",
  ],
};
