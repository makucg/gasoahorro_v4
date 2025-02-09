// app/layout.tsx
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';

const colors = [
  { name: 'light' },
  { name: 'dark' },
  { name: 'posthog' },
  { name: 'darkBlue' },
  { name: 'blossomTheme' },
  { name: 'political' },
];

const themes = colors.map(color => color.name);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`min-h-screen font-sans antialiased ${fontSans.variable}`}
      >
        <Providers
          themeProps={{
            attribute: 'class',
            themes,
            defaultTheme: 'blossomTheme',
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
