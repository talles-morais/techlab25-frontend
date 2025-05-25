import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/cadastro"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  let session;
  if (!isPublicRoute) {
    const cookie = (await cookies()).get("token")?.value;
    if (cookie) {
      session = await decrypt(cookie);
    }
  }

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};