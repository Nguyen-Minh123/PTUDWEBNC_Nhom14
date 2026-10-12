import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware bảo vệ các tuyến đường riêng tư (FR-FTE-007)
 * - /dashboard: Dashboard quản lý hồ sơ và công thức cá nhân
 * - /recipes/new: Form tạo công thức mới
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra cookie session của Auth.js v5 / NextAuth
  const sessionToken =
    request.cookies.get('authjs.session-token') ||
    request.cookies.get('__Secure-authjs.session-token') ||
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token');

  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/recipes/new');

  if (isProtected && !sessionToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/recipes/new/:path*'],
};
