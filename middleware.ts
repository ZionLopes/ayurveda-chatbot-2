import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Use getSession — works with older cookie formats too
  const { data: { session }, error } = await supabase.auth.getSession()
  const user = session?.user ?? null

  const authCookie = request.cookies.get('sb-htlauuixpwujpffsyzpx-auth-token')?.value;
  console.log('MIDDLEWARE CHECK - Auth Cookie Value starts with:', authCookie ? authCookie.substring(0, 20) : 'null');
  console.log('MIDDLEWARE CHECK - Session:', session ? 'Exists' : 'Null', 'Error:', error);

  const pathname = request.nextUrl.pathname

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/chat') ||
    pathname.startsWith('/dosha') ||
    pathname.startsWith('/herbs') ||
    pathname.startsWith('/foods') ||
    pathname.startsWith('/knowledge')

  const isAuthenticated = user !== null || !!authCookie;

  // If not logged in and trying to access protected route → redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If logged in and on auth pages → redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
