import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log("Middleware running on:", request.nextUrl.pathname);
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === '/login' || pathname === '/signup';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow request to continue
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup'
    ]
}