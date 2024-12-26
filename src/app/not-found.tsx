'use client';
import { fontSans } from '@/config/fonts';
import { Button, Card, Image, Spacer } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';

import { Providers } from './providers';
import '@/styles/globals.css';

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

export default function GlobalNotFound({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', themes, defaultTheme: 'blossomTheme' }}>
          <div
            className="flex h-screen flex-col items-center justify-center"
          >
            <main className="px-4 text-center">
              <Card style={{ maxWidth: '600px', padding: '40px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <Image
                  src="https://http.cat/404"
                  alt="404 - Not Found"
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    marginBottom: '30px',
                  }}
                />
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                  Oops! You seem to be lost.
                </h1>
                <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
                  We couldn't find the page you're looking for. Maybe the URL is incorrect or the page has been moved.
                </p>
                <Spacer y={1.5} />
                <Link href="/" passHref>
                  <Button color="primary" size="lg">Go Back Home</Button>
                </Link>
                {children && <div style={{ marginTop: '20px' }}>{children}</div>}
              </Card>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
