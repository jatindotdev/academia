import { NextResponse, NextRequest } from "next/server";
import { getCookie, getPayment } from "./utils/getCookieServer";

export const runtime = "experimental-edge";

export async function middleware(request: NextRequest) {
  const cookie = await getCookie();
  if (!cookie.token)
    return NextResponse.redirect(new URL("/auth/login", request.url));
  if (!cookie.user)
    return NextResponse.redirect(new URL("/auth/logout", request.url));

  const data = await getPayment(cookie.user);
  if (!data && request.nextUrl.pathname !== "/app/subscription")
    return NextResponse.redirect(new URL("/app/subscription", request.url));
  const response = NextResponse.next();
  response.cookies.set("Payment-data", JSON.stringify(data), { path: "/" });
  return response;
}

export const config = {
  matcher: "/app/(.*)",
};
