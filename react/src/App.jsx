import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './HomePage';
import ConnexionPage from './components/Login';
import InscriptionPage from './components/Register';
import CreerArticlePage from './components/CreateArticle';
import ArticlePage from './page/PageArticle';
import UpdateArticle from './components/UpdateArticle';
import PanierPage from './page/PagePanier';
import Paiement from './page/PagePaiement'
import { CartProvider } from './components/CartContext';

const App = () => {
  return (
    <CartProvider>
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
              <Route path="/admin/creer-article" element={<CreerArticlePage />} />
              <Route path="/articles/mettre-a-jour/:articleId" element={<UpdateArticle />} />
              <Route path="/paiement" element={<Paiement/>} />
            </Routes>
          </main>
          {/* Panier always visible */}
          <PanierPage />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
