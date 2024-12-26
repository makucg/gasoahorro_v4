'use client';

import { useMediaQuery } from 'react-responsive';
import DesktopHome from './desktop/desktop-home';
import MobileHome from './mobile/mobile-home';

const ResponsiveLayout = () => {
  // Detectar se é un dispositivo móbil (máximo 1024px de ancho)
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  // Renderizar o fluxo apropiado
  return isMobile ? <MobileHome /> : <DesktopHome />;
};

export default ResponsiveLayout;
