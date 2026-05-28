import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { passcode } = await request.json();
    const adminPasscode = process.env.ADMIN_PASSCODE || "admin123";

    if (passcode === adminPasscode) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active_session_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Authentication successful." });
    }

    return NextResponse.json({ error: "Invalid passcode provided." }, { status: 401 });
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
