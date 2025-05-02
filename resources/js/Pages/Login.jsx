import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2a3740]">
      <div className="bg-[#e6e7ec] p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        <form>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-semibold">Mot de passe</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2a3740] text-white py-2 rounded hover:bg-[#47525a] duration-300 ease-in-out"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
