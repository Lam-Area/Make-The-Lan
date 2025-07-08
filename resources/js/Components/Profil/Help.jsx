import React from 'react';

export default function HelpSection() {
  const faq = [
    {
      question: 'Comment télécharger mon code après achat ?',
      answer: 'Le code sera envoyé par mail',
    },
    {
      question: 'Puis-je me faire rembourser ?',
      answer: "Non, une fois l'achat effectué, le remboursement est impossible car l'argent est reversé au créateur de l'article vendu",
    },
    {
      question: 'Comment contacter le support ?',
      answer: 'Vous pouvez nous écrire via notre adresse mail support@myscript.com.',
    },
  ];

  return (
    <div className="max-w-3xl bg-[#1E1E21] bg-opacity-25 text-white mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Centre d’aide</h2>

      <div className="space-y-6">
        {faq.map((item, idx) => (
          <div key={idx}>
            <p className="font-semibold">{item.question}</p>
            <p className="text-sm mt-1">{item.answer}</p>
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