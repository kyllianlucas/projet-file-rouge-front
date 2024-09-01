import React from 'react';

function HomePage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Bienvenue sur notre site
      </h1>
      <p className="text-xl text-gray-700 mb-6 text-center">
        Ceci est la page d&#39;accueil de notre application. Vous pouvez naviguer en utilisant les liens ci-dessus.
      </p>
    </div>
  );
}

export default HomePage;
