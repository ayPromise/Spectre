import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/profile", "/materials", "/schedule", "/archive"];
const publicOnlyPaths = ["/sign-in"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isPublicOnly = publicOnlyPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    if (!token) {
      const loginUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
    }
    
  if (isPublicOnly) {
    if (token) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
    }

  return NextResponse.next();
}

export const config = {
    matcher: [
      "/dashboard/:path*",
      "/profile/:path*",
      "/materials/:path*",
      "/archive/:path*",
      "/schedule/:path*",
      "/sign-in",
    ],
  };