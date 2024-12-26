import type { Metadata } from 'next';
import CookieBanner from '@/components/cookie-banner';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { siteConfig } from '@/config/site';
import queryClient from '@/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Configuración de idioma
  setRequestLocale(locale);

  // Carga los mensajes de traducción
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <div className="relative flex h-screen flex-col">
          <Navbar />
          <main className="container mx-auto max-w-7xl grow px-6">
            {children}
          </main>
          <CookieBanner />
          <Footer />
        </div>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
