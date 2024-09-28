import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './HomePage';
import ConnexionPage from './components/Login';
import InscriptionPage from './components/Register';
import CreerArticlePage from './components/CreateArticle';
import ArticlePage from './page/PageArticle';
import UpdateArticle from './components/UpdateArticle';
import PanierPage from './page/PagePanier';
import Paiement from './page/PagePaiement';
import { CartProvider } from './components/CartContext';
import { ArticleProvider } from './components/ArticleContext';
import CreerCategorie from './components/CreateCategorie';
import UpdateUser from './components/UpdateUser'
import ArticleDetail from './components/ArticleDetail';

const App = () => {
  return (
    <CartProvider>
      <ArticleProvider>
        <Router>
          <div className="App">
            <Header />
            {/* Main content */}
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/connexion" element={<ConnexionPage />} />
                <Route path="/inscription" element={<InscriptionPage />} />
                <Route path="/article" element={<ArticlePage />} />
                <Route path="/article-detail" element={<ArticleDetail />} />
                <Route path="/admin/creer-article" element={<CreerArticlePage />} />
                <Route path="/admin/creer-categorie" element={<CreerCategorie />} />
                <Route path="/article/mettre-a-jour" element={<UpdateArticle />} />
                <Route path="/paiement" element={<Paiement />} />
                <Route path="/mettre-a-jour-utilisateur" element={<UpdateUser />} />
              </Routes>
            </main>
            <VisibilityPanier />
          </div>
        </Router>
      </ArticleProvider>
    </CartProvider>
  );
};

// Composant pour gérer la visibilité du panier
const VisibilityPanier = () => {
  const location = useLocation();

  // Vérifie si la route actuelle est celle de la page de paiement
  const isPaymentPage = location.pathname === '/paiement';

  // N'affiche pas le panier sur la page de paiement
  return !isPaymentPage ? (
    <div className="fixed right-4 top-20 w-80">
      <PanierPage />
    </div>
  ) : null;
};

export default App;
