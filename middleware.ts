import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth-middleware";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    const response = authMiddleware(req);
    if (response) {
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/login"],
};
