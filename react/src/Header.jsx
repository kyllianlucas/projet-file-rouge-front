import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-400">Mon Application</Link>
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
                {isAdmin && (
                  <>
                    <li>
                      <Link to="/create-article" className="hover:text-gray-400">Créer Article</Link>
                    </li>
                    <li>
                      <Link to="/update-article" className="hover:text-gray-400">Mettre à jour l&#39;article</Link>
                    </li>
                  </>
                )}
                <li className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-white cursor-pointer" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                      <Link to="/update" className="block px-4 py-2 hover:bg-gray-100">Mettre à jour</Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-400">Connexion</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-400">S’inscrire</Link>
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
