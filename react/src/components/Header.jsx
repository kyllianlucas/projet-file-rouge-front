import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showExpiredPopup, setShowExpiredPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');

    if (token) {
      setIsLoggedIn(true);

      try {
        const decodedToken = jwtDecode(token);
        const exp = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (exp < currentTime) {
          setShowExpiredPopup(true);
          handleLogout();
        } else {
          const userRole = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if (userRole === 'ADMIN') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="flex space-x-6">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/article" className="hover:underline">Articles</Link>
        </nav>

        <div className="text-3xl font-bold text-center flex-grow">
          <Link to="/">TheBadmintonShop</Link>
        </div>

        <nav className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/mettre-a-jour-utilisateur"className="hover:underline">Mettre a jour Utilisateur</Link>
              {isAdmin && (
                <>
                <Link to="/admin/creer-categorie" className="hover:underline">Créer une Catégorie</Link>
                <Link to="/admin/creer-article" className="hover:underline">Créer un Article</Link>
                </>
              )}
              <button onClick={handleLogout} className="hover:underline">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/connexion" className="hover:underline">Connexion</Link>
              <Link to="/inscription" className="hover:underline">Inscription</Link>
            </>
          )}
        </nav>
      </div>

      {/* Pop-up pour l'expiration du token */}
      {showExpiredPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Session expirée</h2>
          <p className="text-gray-700">Votre session a expiré. Veuillez vous reconnecter.</p>
          <button 
            onClick={() => {
              setShowExpiredPopup(false);
              navigate('/'); 
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
      )}
    </header>
  );
};

export default Header;
