import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './libs/i18nNavigation';
import { createRouteMatcher } from './libs/routeMatcher';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/:locale/dashboard(.*)']);

// Verifica si un usuario está autenticado revisando la cookie
const isAuthenticated = (request: NextRequest) => {
  const authToken = request.cookies.get('authToken'); // Busca la cookie 'authToken'
  return !!authToken; // Retorna true si la cookie existe, false de lo contrario
};

// Middleware principal
export default async function middleware(request: NextRequest) {
  // Verificar si es una ruta protegida
  if (isProtectedRoute(request)) {
    if (!isAuthenticated(request)) {
      const locale = request.nextUrl.pathname.match(/^\/([^/]+)\//)?.[1] ?? 'es';
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/sign-in`; // Redirigir al inicio de sesión
      return NextResponse.redirect(url);
    }
  }

  // Ejecutar middleware de internacionalización
  return intlMiddleware(request);
}

// Configuración de matcher
export const config = {
  matcher: [
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
