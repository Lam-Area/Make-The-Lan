// resources/js/Pages/Terms.jsx
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function Terms() {
  return (
    <MainLayout>
      <div className="min-h-screen text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8">
            <h1 className="text-3xl font-semibold">Conditions générales</h1>
            <p className="mt-1 text-sm text-gray-400">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

            <div className="mt-6 space-y-6 text-sm leading-6 text-gray-200">
              <section>
                <h2 className="text-lg font-medium text-white mb-2">Objet</h2>
                <p>
                  Les présentes CGV encadrent la vente des produits proposés sur Make The Lan et
                  définissent les droits et obligations des parties.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Commandes & Paiement</h2>
                <p>
                  Les commandes sont payables en ligne via Stripe. La commande est considérée
                  comme définitive après confirmation du paiement.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Livraison</h2>
                <p>
                  Les délais de livraison sont indicatifs. En cas de retard, nous vous informerons
                  par email. Les risques sont transférés à la remise au transporteur.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Retours & Rétractation</h2>
                <p>
                  Vous disposez d’un délai légal de rétractation de 14 jours. Le produit doit être
                  retourné en parfait état et dans son emballage d’origine.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Garanties</h2>
                <p>
                  Nos produits bénéficient des garanties légales en vigueur et, le cas échéant,
                  d’une garantie commerciale précisée sur la fiche article.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium text-white mb-2">Contact</h2>
                <p>Support — admin@mtl.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
