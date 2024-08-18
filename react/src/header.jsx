import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirige vers la page de connexion après déconnexion
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Mon Application</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">Accueil</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">À propos</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile" className="hover:text-gray-400">Profil</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-400 focus:outline-none"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-400">Connexion</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-400">S&#39;inscrire</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;