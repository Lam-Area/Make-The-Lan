import React from 'react';

export default function TermsPage() {
  return (
    <div className="text-white max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">Conditions générales de vente</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Article 1 - Objet</h2>
        <p>
          Les présentes conditions régissent la vente de scripts informatiques proposés sur le site MyScript. Elles précisent les droits et obligations du vendeur et de l’acheteur.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Article 2 - Prix</h2>
        <p>
          Les prix sont indiqués en euros toutes taxes comprises. MyScript se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base en vigueur au moment de la validation.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Article 3 - Commandes</h2>
        <p>
          L'utilisateur sélectionne ses scripts, valide sa commande et règle le montant via un moyen de paiement sécurisé. Une confirmation de commande est envoyée automatiquement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Article 4 - Livraison</h2>
        <p>
          Les scripts sont livrés immédiatement après paiement sous forme de lien de téléchargement ou d’accès au compte personnel. Aucun envoi physique n’est réalisé.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Article 5 - Droit de rétractation</h2>
        <p>
          Conformément à l’article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques fournis immédiatement après paiement.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Article 6 - Responsabilité</h2>
        <p>
          MyScript ne saurait être tenu responsable des dommages causés par une mauvaise utilisation des scripts ou un usage contraire aux lois en vigueur.
        </p>
      </section>
    </div>
  );
}
