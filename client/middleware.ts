import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@shared/types";
import getUserFromToken from "./lib/getUserFromToken";

const protectedPatterns = [
  /^\/dashboard/,
  /^\/profile/,
  /^\/schedule/,
  /^\/archive/,
  /^\/materials(\/[^\/]+)?$/,
  /^\/materials\/[^\/]+\/[^\/]+$/,
];

const adminOnlyPatterns = [
  /^\/materials\/create$/,
  /^\/materials\/[^\/]+\/[^\/]+\/edit$/,
  /^\/dashboard/,
];

const publicOnlyPaths = ["/sign-in"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user = await getUserFromToken(token);
  const role = user?.role as string | undefined;
  const { pathname } = req.nextUrl;

  const isProtected = protectedPatterns.some((regex) => regex.test(pathname));
  const isAdminOnly = adminOnlyPatterns.some((regex) => regex.test(pathname));
  const isPublicOnly = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (
    isAdminOnly &&
    ![UserRole.Admin, UserRole.Instructor].includes(role as UserRole)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicOnly && user) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
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
