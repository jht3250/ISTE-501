import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/auth', '/auth/create-account', '/auth/reset']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))

  const userId = request.cookies.get('user_id')?.value

  if (!userId && !isPublic) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Only redirect logged-in users away from login/create-account, not reset (used from profile too)
  if (userId && (pathname === '/auth' || pathname === '/auth/create-account')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)']
}
