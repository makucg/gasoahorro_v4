'use client';

import type { FC } from 'react';

const PrivacyAndCookies: FC = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">Política de Privacidad y Cookies</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Introducción</h2>
        <p className="text-gray-700">
          En GasoAhorro nos tomamos muy en serio tu privacidad. Este documento explica cómo usamos y
          protegemos tus datos personales, así como el uso de cookies en nuestro sitio web.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Datos que recopilamos</h2>
        <p className="text-gray-700">
          Actualmente no recopilamos información personal directamente identificable. Sin embargo,
          podemos recopilar datos generales para mejorar el servicio:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Dirección IP anonimizada.</li>
          <li>Ubicación aproximada.</li>
          <li>Páginas visitadas y duración en el sitio.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Uso de Cookies</h2>
        <p className="text-gray-700">
          Las cookies se usan para mejorar tu experiencia en el sitio. Estas son las categorías de
          cookies que usamos:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Esenciales:</strong>
            {' '}
            Necesarias para el funcionamiento básico del sitio.
          </li>
          <li>
            <strong>Análisis:</strong>
            {' '}
            Herramientas como Google Analytics para entender cómo los
            usuarios interactúan con nuestro sitio.
          </li>
          <li>
            <strong>Publicidad:</strong>
            {' '}
            (En el futuro) Mostrar anuncios relevantes a los usuarios.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Gestión de Cookies</h2>
        <p className="text-gray-700">
          Puedes configurar tu navegador para rechazar cookies o eliminarlas. Sin embargo, esto
          podría afectar la funcionalidad del sitio.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Contacto</h2>
        <p className="text-gray-700">
          Para dudas o comentarios, contáctanos en
          {' '}
          <a href="mailto:soporte@gasoahorro.com" className="text-blue-500 underline">
            soporte@gasoahorro.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyAndCookies;
