'use client';

import { useEffect, useState } from 'react';
import DesktopHome from './desktop/desktop-home';
import MobileHome from './mobile/mobile-home';

const ResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Breakpoint móvil
    };

    checkIsMobile(); // Detectar al cargar la página
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  if (isMobile === null) {
    return <div>Cargando...</div>; // Placeholder mientras se detecta el dispositivo
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
};

export default ResponsiveLayout;
