import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

// Optimistic gate for /admin: pages and server actions re-check the session themselves.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const onLogin = pathname === "/admin/login";

  if (!authed && !onLogin) return NextResponse.redirect(new URL("/admin/login", request.url));
  if (authed && onLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
