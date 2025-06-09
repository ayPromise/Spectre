import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { UserRole } from "@shared/types";

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

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

const getUserFromToken = async (token: string | undefined) => {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error: any) {
    return null;
  }
};

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
