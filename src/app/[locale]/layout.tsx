import type { Metadata, Viewport } from 'next';
import CookieBanner from '@/components/cookie-banner';
import Footer from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import queryClient from '@/libs/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import clsx from 'clsx';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Providers } from '../providers';
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const colors = [
  {
    name: 'light',
  },
  {
    name: 'dark',
  },
  {
    name: 'posthog',
  },
  {
    name: 'darkBlue',
  },
  {
    name: 'blossomTheme',
  },
  {
    name: 'political',
  },
];

const themes = colors.map(color => color.name);

export default async function RootLayout({
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
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryClientProvider client={queryClient}>
            <Providers themeProps={{ attribute: 'class', themes, defaultTheme: 'blossomTheme' }}>
              <div className="relative flex h-screen flex-col">
                <Navbar />
                <main className="container mx-auto max-w-7xl grow px-6">
                  {children}
                </main>

                <CookieBanner />
                <Footer />
              </div>
            </Providers>
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
