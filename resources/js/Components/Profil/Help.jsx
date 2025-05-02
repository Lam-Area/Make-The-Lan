import React from 'react';

export default function HelpSection() {
  const faq = [
    {
      question: 'Comment télécharger un script après achat ?',
      answer: 'Allez dans votre historique d’achat et cliquez sur le bouton "Télécharger" si disponible.',
    },
    {
      question: 'Puis-je me faire rembourser un script ?',
      answer: 'Non, en raison de la nature numérique des scripts, aucun remboursement n’est possible une fois le script téléchargé.',
    },
    {
      question: 'Comment contacter le support ?',
      answer: 'Vous pouvez nous écrire via le formulaire de contact ou à l’adresse support@myscript.com.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Centre d’aide</h2>

      <div className="space-y-6">
        {faq.map((item, idx) => (
          <div key={idx}>
            <p className="font-semibold text-gray-800">{item.question}</p>
            <p className="text-sm text-gray-600 mt-1">{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/contact"
          className="inline-block text-sm text-blue-600 hover:underline"
        >
          Contacter le support
        </a>
      </div>
    </div>
  );
}