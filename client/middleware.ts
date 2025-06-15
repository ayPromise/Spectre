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
  // Перевіряємо наявність cookie token
  const token = req.cookies.get("token")?.value;
  console.log(`Middleware: token: ${token || "none"}`);

  const { pathname } = req.nextUrl;
  const isProtected = protectedPatterns.some((regex) => regex.test(pathname));
  const isAdminOnly = adminOnlyPatterns.some((regex) => regex.test(pathname));
  const isPublicOnly = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Перенаправлення для захищених маршрутів без токена
  if ((isProtected || isAdminOnly) && !token) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectURL", req.url);
    const response = NextResponse.redirect(redirectUrl);
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // Для adminOnly маршрутів покладаємося на клієнтську перевірку
  if (isAdminOnly && token) {
    // Роль перевіряється на клієнті через useAuthStatus
  }

  // Перенаправлення авторизованих користувачів із public-only маршрутів
  if (isPublicOnly && token) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.headers.set("x-middleware-cache", "no-cache");
    return response;
  }

  // Catch-all: перенаправлення неавторизованих користувачів
  if (!isPublicOnly && !isProtected && !token) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirectURL", req.url);
    const response = NextResponse.redirect(redirectUrl);
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
