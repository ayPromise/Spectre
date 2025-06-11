import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@shared/types";
import getUserFromToken from "./lib/getUserFromToken";

const protectedPatterns = [
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
  /^\/dashboard(\/[^\/]+)?$/,
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

  // 1) Redirect unauthenticated users from admin or protected routes to /sign-in
  if ((isProtected || isAdminOnly) && !user) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectURL", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 2) Redirect authenticated users without admin role if route is admin only
  if (
    isAdminOnly &&
    user &&
    ![UserRole.Admin, UserRole.Instructor].includes(role as UserRole)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3) Redirect authenticated users from public-only paths (like sign-in) to home
  if (isPublicOnly && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4) Catch-all: if the URL is NOT public, NOT protected, and user is NOT authenticated, redirect to sign-in
  if (!isPublicOnly && !isProtected && !user) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectURL", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Otherwise, allow request
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
