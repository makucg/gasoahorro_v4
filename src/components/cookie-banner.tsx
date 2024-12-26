'use client';

import { Button, Drawer, DrawerBody, DrawerContent } from '@nextui-org/react';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Verificar consentimiento al montar el componente
  useEffect(() => {
    const consent = localStorage.getItem('userConsent');
    if (!consent) {
      setShowBanner(true); // Mostrar el banner si no hay consentimiento
    } else if (consent === 'accepted') {
      setAnalyticsEnabled(true); // Habilitar Analytics si aceptado previamente
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('userConsent', 'accepted');
    setAnalyticsEnabled(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('userConsent', 'rejected');
    setAnalyticsEnabled(false);
    setShowBanner(false);
  };

  return (
    <>
      {/* Incluir Google Analytics si el consentimiento es positivo */}
      {analyticsEnabled && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `}
          </Script>
        </>
      )}

      {/* Banner de cookies dentro de un Drawer */}
      <Drawer
        isDismissable={false} // Evitar cerrar haciendo clic fuera
        isKeyboardDismissDisabled // Deshabilitar escape
        isOpen={showBanner}
        placement="bottom" // Mostrar en la parte inferior
      >
        <DrawerContent>
          <DrawerBody className="flex flex-col items-center bg-gray-800 p-4 text-white sm:flex-row sm:justify-between">
            <p className="text-center text-sm sm:text-left">
              Este sitio utiliza cookies para mejorar tu experiencia.
              {' '}
              <Link
                href="/legal/privacy"
                className="underline hover:text-blue-400"
              >
                Más información
              </Link>
            </p>
            <div className="mt-4 flex gap-2 sm:mt-0">
              <Button
                onPress={handleReject}
                color="default"
                className="text-xs sm:text-sm"
                size="sm"
              >
                Rechazar
              </Button>
              <Button
                onPress={handleAccept}
                color="primary"
                className="text-xs sm:text-sm"
                size="sm"
              >
                Aceptar
              </Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CookieBanner;
