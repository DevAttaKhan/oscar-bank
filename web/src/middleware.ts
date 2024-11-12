import { auth } from "@/auth";
import { isExpired } from "react-jwt";

export default auth((req) => {
  if (
    !req.auth?.user?.token ||
    (req.auth?.user.refreshToken && isExpired(req.auth?.user.refreshToken))
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
