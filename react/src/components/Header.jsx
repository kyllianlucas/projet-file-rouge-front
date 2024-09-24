import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showExpiredPopup, setShowExpiredPopup] = useState(false); // État pour gérer la pop-up
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');

    if (token) {
      setIsLoggedIn(true);

      try {
        const decodedToken = jwtDecode(token);
        const exp = decodedToken.exp * 1000; // Convertir en millisecondes
        const currentTime = Date.now();

        if (exp < currentTime) {
          setShowExpiredPopup(true);
          handleLogout(); // Optionnel : déconnecter l'utilisateur
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
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold">
          <Link to="/">BadmintonShop</Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Accueil</Link></li>
            <li><Link to="/article" className="hover:underline">Articles</Link></li>

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <li>
                    <Link to="/admin/creer-article" className="hover:underline">Créer un Article</Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:underline"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/connexion" className="hover:underline">Connexion</Link></li>
                <li><Link to="/inscription" className="hover:underline">Inscription</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/panier" className="hover:underline">Panier</Link>
        </div>
      </div>

      {/* Pop-up pour l'expiration du token */}
      {showExpiredPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="text-lg font-bold">Session expirée</h2>
            <p>Votre session a expiré. Veuillez vous reconnecter.</p>
            <button 
              onClick={() => {
                setShowExpiredPopup(false);
                navigate('/'); // Redirection vers la page d'accueil
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
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
