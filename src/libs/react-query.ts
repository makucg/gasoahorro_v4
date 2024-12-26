'use client';

import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Intentos en caso de fallo
      staleTime: 5 * 60 * 1000, // 5 minutos antes de considerar los datos obsoletos
      refetchOnWindowFocus: false, // No volver a consultar al cambiar de ventana
    },
  },
});

export default queryClient;
