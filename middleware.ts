import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  const isAuthPage = ['/login', '/cadastro'].includes(request.nextUrl.pathname)
  const isProtectedPage = ['/feed', '/perfil', '/postar', '/sair'].includes(request.nextUrl.pathname)

  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/feed', request.url))
  }

  // Redirect unauthenticated users to login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}