'use client';

import { siteConfig } from '@/config/site';
import { Button, Link } from '@nextui-org/react';
import React from 'react';
import { GithubIcon, HeartFilledIcon, LinkedInIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección principal del footer */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          {/* Logo o Nombre */}
          <div className="mb-4 text-center sm:mb-0 sm:text-left">
            <Link
              href="/"
              className="text-lg font-bold"
            >
              GasoAhorro
            </Link>
            <p className="mt-1 text-sm">
              Encuentra las mejores gasolineras cercanas.
            </p>
          </div>

          {/* Derechos de autor */}
          <div className="text-center text-gray-500 sm:text-right">
            <p className="text-sm">
              ©
              {' '}
              {new Date().getFullYear()}
              {' '}
              GasoAhorro. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Enlaces rápidos y sociales */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Enlaces internos */}
          <div className="flex gap-4">
            <Link
              href="/legal/privacy"
              className="text-sm text-gray-500"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/legal/terms"
              className="text-sm text-gray-500"
            >
              Términos de Uso
            </Link>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4">
            <Link
              isExternal
              aria-label="Discord"
              href={siteConfig.links.linkedin}
            >
              <LinkedInIcon className="size-6 text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Github"
              href={siteConfig.links.github}
              className="hover:text-gray-700"
            >
              <GithubIcon className="size-6 text-default-500" />
            </Link>
          </div>
        </div>

        {/* Botón de patrocinio */}
        <div className="mt-6 text-center">
          <Button
            isExternal
            as={Link}
            href={siteConfig.links.sponsor}
            className="bg-default-100 text-sm font-normal text-default-600"
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
