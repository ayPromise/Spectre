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
  console.log(
    `Middleware: pathname: ${req.nextUrl.pathname}, token: ${token || "none"}`
  );

  const { pathname } = req.nextUrl;
  const isProtected = protectedPatterns.some((regex) => regex.test(pathname));
  const isAdminOnly = adminOnlyPatterns.some((regex) => regex.test(pathname));
  const isPublicOnly = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Перенаправлення авторизованих користувачів із public-only маршрутів
  if (isPublicOnly && token) {
    console.log(
      `Middleware: Redirecting authenticated user from ${pathname} to /`
    );
    const response = NextResponse.redirect(new URL("/", req.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // Пропускаємо перевірку для захищених маршрутів, покладаємося на клієнт
  if (isProtected || isAdminOnly) {
    console.log(`Middleware: Allowing access to protected route: ${pathname}`);
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
