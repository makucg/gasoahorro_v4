'use client';

import type { FC } from 'react';

const TermsOfUse: FC = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">Términos de Uso</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Introducción</h2>
        <p className="text-gray-700">
          Bienvenido a GasoAhorro. Al usar este sitio web, aceptas cumplir con estos términos de uso.
          Si no estás de acuerdo, por favor no utilices nuestro sitio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Condiciones de Uso</h2>
        <p className="text-gray-700">
          Este sitio se proporciona exclusivamente con fines informativos. Los usuarios no deben:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Usar el sitio para actividades ilegales o fraudulentas.</li>
          <li>Acceder al sitio mediante métodos automatizados (bots).</li>
          <li>Distribuir o modificar contenido sin autorización previa.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Limitación de Responsabilidad</h2>
        <p className="text-gray-700">
          GasoAhorro no garantiza que toda la información proporcionada sea completamente precisa o
          actualizada. No nos hacemos responsables por pérdidas o daños derivados del uso del sitio.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Modificaciones</h2>
        <p className="text-gray-700">
          Nos reservamos el derecho de actualizar estos términos en cualquier momento. Te
          recomendamos revisarlos periódicamente.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
