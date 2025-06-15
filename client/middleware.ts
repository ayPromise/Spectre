import { NextResponse, NextRequest } from "next/server";

const protectedPatterns = [
  /^\/achievements/,
  /^\/library/,
  /^\/schedule/,
  /^\/archive/,
  /^\/materials(\/[^\/]+)?$/,
  /^\/materials\/[^\/]+\/[^\/]+$/,
];

const adminOnlyPatterns = [
  /^\/materials\/create$/,
  /^\/materials\/[^\/]+\/[^\/]+\/edit$/,
  /^\/dashboard/,
  /^\/dashboard(\/[^\/]+)?$/,
];

const publicOnlyPaths = ["/sign-in"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const isPublicOnly = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicOnly && token) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/achievements",
    "/materials/:path*",
    "/archive/:path*",
    "/schedule/:path*",
    "/library/:path*",
    "/sign-in",
  ],
};
