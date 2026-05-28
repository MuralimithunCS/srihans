import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths to check
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
