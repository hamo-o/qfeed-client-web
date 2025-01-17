import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSignUp } from "./apis/auth/checkSignUp";
import { checkSignIn } from "./apis/auth/checkSignIn";
import { qFeedAxios } from "./apis/axios";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);

    if (pathname.match("/((?!account|auth).*)")) {
        return await checkSignIn(request);
    } else if (pathname.match("/((?!account).*)")) {
        return await checkSignUp(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|account|img|_next/static|_next/image|favicon.ico).*)"]
};
