'use client';

import { Button, Card, Image, Spacer } from '@nextui-org/react';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <main className="px-4 text-center">
        <Card
          style={{
            maxWidth: '600px',
            padding: '40px',
            margin: '0 auto',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
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
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            Oops! You seem to be lost.
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#555',
              marginBottom: '30px',
            }}
          >
            We couldn't find the page you're looking for. Maybe the URL is
            incorrect or the page has been moved.
          </p>
          <Spacer y={1.5} />
          <Link href="/" passHref>
            <Button color="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
