import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // 1. Creamos una respuesta base que podemos modificar para inyectarle las cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Inicializamos el cliente de Supabase para el Servidor
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Actualizamos la cookie en la petición
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          // Actualizamos la cookie en la respuesta
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 3. Obtenemos el usuario actual
  // Usamos getUser() porque es más seguro en el servidor que getSession()
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Lógica de protección de rutas
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboardAdmin')
  const isLoginRoute = request.nextUrl.pathname === '/login'

  // Si NO hay usuario y quiere entrar al dashboard -> Lo mandamos al login
  if (!user && isDashboardRoute) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si SÍ hay usuario y quiere entrar a la página de login -> Lo mandamos al dashboard
  if (user && isLoginRoute) {
    const dashboardUrl = new URL('/dashboardAdmin', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // 5. Si todo está bien, dejamos que la petición continúe normalmente
  return response
}

// 6. Configuración del Middleware
// Aquí le decimos a Next.js en qué rutas NO debe ejecutar este guardia 
// (ignoramos archivos estáticos, imágenes, etc. para ahorrar recursos)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}