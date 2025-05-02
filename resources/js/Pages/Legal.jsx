import React from 'react';

export default function LegalPage() {
  return (
    <div className="text-white max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Informations légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          <strong>MyScript</strong> <br />
          42 Rue des Scripts, 13000 Marseille, France <br />
          Email : contact@myscript.com <br />
          SIRET : 123 456 789 00000
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Responsable de la publication</h2>
        <p>John Doe – contact@myscript.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>
          OVH SAS <br />
          2 rue Kellermann, 59100 Roubaix, France <br />
          Téléphone : 1007
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les contenus (scripts, textes, images, logos) présents sur le site MyScript
          sont protégés par les lois en vigueur sur la propriété intellectuelle et sont la propriété exclusive de MyScript.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Conditions d’utilisation</h2>
        <p>
          L’accès au site implique l’acceptation pleine et entière des conditions générales d’utilisation. Le site est mis à jour régulièrement.
        </p>
      </section>
    </div>
  );
}
