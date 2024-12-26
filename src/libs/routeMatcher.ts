import type { NextRequest } from 'next/server';

/**
 * Crea una función para verificar si una URL coincide con alguno de los patrones proporcionados.
 *
 * @param routes - Array de patrones de ruta (expresiones regulares como strings)
 * @returns Función que verifica si una ruta coincide
 */
export function createRouteMatcher(routes: string[]) {
  const matchers = routes.map(route => new RegExp(`^${route.replace(/\//g, '\\/')}$`));

  return (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    return matchers.some(matcher => matcher.test(pathname));
  };
}
