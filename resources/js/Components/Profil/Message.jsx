import React, { useState } from 'react';

export default function MessagesSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Support',
      subject: 'Confirmation de commande',
      content: 'Bonjour, votre script a bien été livré...',
      date: '2025-04-25',
    },
    {
      id: 2,
      from: 'Admin',
      subject: 'Nouveaux outils disponibles',
      content: 'Découvrez nos nouveaux scripts disponibles dans le shop...',
      date: '2025-04-22',
    },
  ]);

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Mes messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-500 italic">Aucun message reçu.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border rounded p-4 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{msg.subject}</p>
                  <p className="text-sm text-gray-500">De : {msg.from} · {msg.date}</p>
                </div>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Supprimer
                </button>
              </div>
              <p className="text-gray-700 text-sm">{msg.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
