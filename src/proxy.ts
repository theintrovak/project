import { NextResponse, NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicpath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';
    if (!publicpath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (publicpath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/signup', '/login', '/profile',],
}