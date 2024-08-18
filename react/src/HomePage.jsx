import React from 'react';

function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre site</h1>
      <p className="text-lg mb-4">Ceci est la page d&#39;accueil de notre application. Vous pouvez naviguer en utilisant les liens ci-dessous.</p>
      
      <div className="space-y-4">
        <a href="/profile" className="text-blue-500 underline">Voir votre profil</a>
        <a href="/settings" className="text-blue-500 underline">Paramètres du compte</a>
      </div>
    </div>
  );
}

export default HomePage;
