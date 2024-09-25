import { useState } from 'react';
import axios from 'axios';

function CreateArticle() {
  const [article, setArticle] = useState({
    productName: '',
    description: '',
    prix: 0,
    remise: 0,
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
    setArticle({ ...article, taille: value });
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
      formData.append('article', new Blob([JSON.stringify(article)], { type: 'application/json' }));
      formData.append('image', image);

      const response = await axios.post('http://localhost:8080/api/admin/produit/creer', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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
    <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Créer un Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nom de la Catégorie</label>
          <select
            name="categorieNom"
            value={categorieNom}
            onChange={(e) => setCategorieNom(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        <div>
          <label className="block text-gray-700">Nom de l&#39;Article</label>
          <input
            type="text"
            name="productName"
            value={article.productName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={article.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Prix</label>
          <input
            type="number"
            name="prix"
            value={article.prix}
            onChange={handleInputChange}
            min="0"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Remise (%)</label>
          <input
            type="number"
            name="remise"
            value={article.remise}
            onChange={handleInputChange}
            min="0"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Prix Spécial</label>
          <input
            type="number"
            name="prixSpecial"
            value={calculatePrixSpecial(article)}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {categorieNom.toLowerCase() === 'tee-shirt' && (
          <>
            <div>
              <label className="block text-gray-700">Sous-catégorie</label>
              <select
                name="sousCategorie"
                value={article.sousCategorie}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Sélectionner une sous-catégorie</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="enfant">Enfant</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Taille (séparer par des virgules)</label>
              <input
                type="text"
                name="taille"
                value={article.taille}
                onChange={handleTailleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}
        
        {categorieNom.toLowerCase() === 'volant' && (
          <div>
            <label className="block text-gray-700">Sous-catégorie</label>
            <select
              name="sousCategorie"
              value={article.sousCategorie}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sélectionner un type de volant</option>
              <option value="plume">Plume</option>
              <option value="hybride">Hybride</option>
              <option value="plastique">Plastique</option>
            </select>
          </div>
        )}
        
        {categorieNom.toLowerCase() === 'raquette' && (
          <div>
            <label className="block text-gray-700">Sous-catégorie</label>
            <select
              name="sousCategorie"
              value={article.sousCategorie}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="mt-4 w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ajouter l&#39;Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
