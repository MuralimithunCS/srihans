import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // 1. Domain-based Routing Check
  // If the link/host contains "admin" (e.g. srihans-admin.vercel.app)
  const isAdminDomain = hostname.toLowerCase().includes("admin");

  if (isAdminDomain) {
    // If they land on the root of the admin link, forward them directly to /admin
    if (pathname === "/" || pathname === "") {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  // 2. Admin Security Check
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth";

  if (isAdminPage || isAdminApi) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      if (isAdminApi) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized access. Invalid or missing admin session." }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      } else {
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except static files & images
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)"],
};
