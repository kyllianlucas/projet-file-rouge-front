import { useState } from 'react';
import axios from 'axios';

function CreateArticle() {
  const [article, setArticle] = useState({
    productName: '',
    description: '',
    prix: '',
    remise: '',
    sousCategorie: '',
    taille: '',
  });

  const [image, setImage] = useState(null);
  const [categorieNom, setCategorieNom] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
      prixSpecial: calculatePrixSpecial({
        ...prevArticle,
        [name]: value,
      }),
    }));
  };

  const calculatePrixSpecial = ({ prix, remise }) => {
    const prixValue = prix ? parseFloat(prix) : 0;
    const remiseValue = remise ? parseFloat(remise) : 0;
    return prixValue - (prixValue * (remiseValue / 100));
  };

  const handleTailleChange = (e) => {
    const { value } = e.target;
    setArticle({ ...article, taille: value }); // Envoie la taille comme chaîne
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt-token');

    if (!token) {
      alert('Vous devez être connecté pour créer un article.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('categorieNom', categorieNom);
      console.log('CategorieNom:', categorieNom);
      formData.append('article', new Blob([JSON.stringify(article)], { type: 'application/json' }));
      console.log('article:', article);
      formData.append('image', image);

      const response = await axios.post('http://localhost:8080/api/admin/produit/creer', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      alert('Article créé avec succès !');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la création de l\'article', error);

      if (error.response && error.response.status === 401) {
        alert('Accès non autorisé. Veuillez vous connecter avec un compte admin.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Créer un Article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nom de la Catégorie</label>
          <select
            name="categorieNom"
            value={categorieNom}
            onChange={(e) => setCategorieNom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="tee-shirt">Tee-shirt</option>
            <option value="volant">Volant</option>
            <option value="sac">Sac</option>
            <option value="chaussure">Chaussure</option>
            <option value="accessoire">Accessoire</option>
            <option value="raquette">Raquette</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nom de l&#39;Article</label>
          <input
            type="text"
            name="productName"
            value={article.productName}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={article.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Prix</label>
          <input
            type="number"
            name="prix"
            value={article.prix}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Remise (%)</label>
          <input
            type="number"
            name="remise"
            value={article.remise}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            min="0"
            required
          />
        </div>

        {/* Prix spécial calculé automatiquement */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Prix Spécial</label>
          <input
            type="number"
            name="prixSpecial"
            value={calculatePrixSpecial(article)} // Appelle la fonction pour obtenir le prix spécial
            readOnly
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100"
            min="0"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {categorieNom.toLowerCase() === 'tee-shirt' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Sous-catégorie</label>
              <select
                name="sousCategorie"
                value={article.sousCategorie}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="enfant">Enfant</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Taille (séparer par des virgules)</label>
              <input
                type="text"
                name="taille"
                value={article.taille}
                onChange={handleTailleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
          </>
        )}
        {categorieNom.toLowerCase() === 'volant' && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Sous-catégorie</label>
            <select
              name="sousCategorie"
              value={article.sousCategorie}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="">Sélectionner un type de volant</option>
              <option value="plume">Plume</option>
              <option value="hybride">Hybride</option>
              <option value="plastique">Plastique</option>
            </select>
          </div>
        )}
        {categorieNom.toLowerCase() === 'raquette' && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Sous-catégorie</label>
            <select
              name="sousCategorie"
              value={article.sousCategorie}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="">Sélectionner une marque de raquette de badminton</option>
              <option value="apacs">APACS</option>
              <option value="ashaway">ASHAWAY</option>
              <option value="babolat">BABOLAT</option>
              <option value="carlton">CARLTON</option>
              <option value="dunlop">DUNLOP</option>
              <option value="felet">FELET</option>
              <option value="forza">FORZA</option>
              <option value="karakal">KARAKAL</option>
              <option value="kawasaki">KAWASAKI</option>
              <option value="li-ning">LI-NING</option>
              <option value="pro-kennex">PRO KENNEX</option>
              <option value="raquettes-test">RAQUETTES TEST</option>
              <option value="rsl">RSL</option>
              <option value="talbot-torro">TALBOT-TORRO</option>
              <option value="victor">VICTOR</option>
              <option value="wilson">WILSON</option>
              <option value="yonex">YONEX</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ajouter l&#39;Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
