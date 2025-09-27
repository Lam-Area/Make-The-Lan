// resources/js/Pages/Legal.jsx
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function Legal() {
  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8">
            <h1 className="text-3xl font-semibold">Informations légales</h1>
            <p className="mt-1 text-sm text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <div className="mt-6 space-y-6 text-sm leading-6 text-gray-200">
              <section>
                <h2 className="text-lg font-medium text-white mb-2">Éditeur du site</h2>
                <p>Make The Lan — contact&nbsp;: admin@mtl.com</p>
                <p>Adresse postale — xxxxxx, France</p>
                <p>SIREN/SIRET — 000 000 000 00000</p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Hébergement</h2>
                <p>Hébergeur — xxxxxx</p>
                <p>xxxxxx, France</p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Données personnelles</h2>
                <p>
                  Les données collectées sont utilisées pour la gestion des comptes, des commandes
                  et l’amélioration du service. Vous disposez d’un droit d’accès, de rectification
                  et de suppression. Écrivez-nous à <span className="text-blue-300">admin@mtl.com</span>.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Cookies</h2>
                <p>
                  Des cookies techniques et de mesure d’audience peuvent être déposés. Vous pouvez
                  gérer vos préférences depuis votre profil.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
