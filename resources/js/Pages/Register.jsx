import React from 'react';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2a3740]">
      <div className="bg-[#e6e7ec] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nom</label>
            <input type="text" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mot de passe</label>
            <input type="password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
            <input type="password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring" />
          </div>

          <button type="submit" className="w-full bg-[#2a3740] text-white py-2 rounded hover:bg-[#47525a] duration-300 ease-in-out">
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Déjà un compte ? <a href="/login" className="text-blue-600 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
