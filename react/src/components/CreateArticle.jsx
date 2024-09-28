import { useState } from 'react';
import axios from 'axios';

function CreateArticle() {
  const [article, setArticle] = useState({
    productName: '',
    description: '',
    prix: 0,
    remise: 0,
    genre: '',
    taille: [],
    quantite: 1,
    marque: '',
    pointure: [], // Assurez-vous que c'est un tableau
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

  const calculatePrixTotal = () => {
    return calculatePrixSpecial(article).toFixed(2);
  };

  const handleTailleChange = (e) => {
    const { value } = e.target;
    const taillesArray = value.split(',').map(taille => taille.trim());
    setArticle({ ...article, taille: taillesArray });
  };

  const handlePointureChange = (e) => {
    const { value } = e.target;
    const pointureArray = value.split(',').map(pointure => pointure.trim());
    setArticle({ ...article, pointure: pointureArray });
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
      formData.append('articleJson', JSON.stringify({
        ...article,
        taille: article.taille,
        pointure: article.pointure, // Assurez-vous que pointure est un tableau
      }));
      formData.append('image', image);

      const response = await axios.post('http://localhost:8080/api/admin/produit/creer', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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

  // Listes des marques par catégorie
  const raquetteSpecificBrands = [
    'ASHAWAY', 'BABOLAT', 'FORZA', 'LI-NING', 'PRO KENNEX', 'RSL', 'YONEX', 'APACS', 'CARLTON',
    'DUNLOP', 'FELET', 'KARAKAL', 'KAWASAKI', 'RAQUETTES TEST', 'TALBOT-TORRO', 'VICTOR', 'WILSON'
  ];

  const clothingBrands = [
    'ADIDAS', 'ASICS', 'ATP TOUR', 'AUSTRALIAN OPEN', 'BABOLAT', 'BELEN BERBEL',
    'BIDI BADU', 'BULLPADEL', 'DUNLOP', 'EA7', 'ENDLESS', 'ELLESSE', 'ERIMA',
    'FELET', 'FILA', 'FORZA', 'HEAD', 'HYDROGEN', 'JOMA', 'KAWASAKI',
    'LARDE SPORTS', 'LE COQ SPORTIF', 'LOTTO', 'LUCKY IN LOVE', 'MIZUNO',
    'MOURATOGLOU', 'NEW BALANCE', 'NIKE', 'PUMA', 'QUIET PLEASE',
    'RACKET ROOTS', 'ROLAND GARROS', 'RSL', 'TACCHINI', 'TECNIFIBRE',
    'TOPTEX', 'UNDER ARMOUR', 'VICTOR', 'VINTAGE', 'WATTS', 'WILSON',
    'YONEX'
  ];

  const volantSpecificBrands = [
    'ASHAWAY', 'BABOLAT', 'CBX', 'DMANTIS', 'EZYSHUTTLE', 'FORZA',
    'KAWASAKI', 'LI-NING', 'PRO KENNEX', 'RSL', 'SCHILDKROT',
    'SPORT2GO APS', 'VICTOR', 'YONEX'
  ];

  const bagagerieSpecificBrands = [
    'ADIDAS', 'BABOLAT', 'BULLPADEL', 'CARLTON', 'DUNLOP',
    'ERIMA', 'FELET', 'FORZA', 'HEAD', 'JO PARIS 2024',
    'KAWASAKI', 'LARDE SPORTS', 'LI-NING', 'MOURATOGLOU',
    'PRINCE', 'PRO KENNEX', 'ROLAND GARROS', 'RSL',
    'SOLINCO', 'TALBOT-TORRO', 'TECNIFIBRE', 'VICTOR',
    'WILSON', 'YONEX'
  ];

  const shoeSpecificBrands = [
    'ADIDAS', 'ASHAWAY', 'ASICS', 'BABOLAT', 'BULLPADEL',
    'DIADORA', 'FELET', 'FILA', 'FORZA', 'HEAD', 'K-SWISS',
    'KAWASAKI', 'LI-NING', 'LOTTO', 'MIZUNO', 'NEW BALANCE',
    'NIKE', 'SALMING', 'VICTOR', 'WILSON', 'YONEX'
  ];

  const accessoriesSpecificBrands = [
    'ADIDAS', 'ALIONAX', 'AMPHORA', 'ASHAWAY', 'ASICS',
    'BADMINTON-POINT', 'BIDI BADU', 'BULLPADEL',
    'CARLTON', 'CB BADMINTON', 'DUNLOP', 'EA7', 'ERIMA',
    'FELET', 'FILA', 'FORZA', 'GAMMA', 'GRIPFIXER',
    'HEAD', 'HYDROGEN', 'JO PARIS 2024', 'JOMA',
    'KARAKAL', 'KAWASAKI', 'LACOSTE', 'LARDE SPORTS',
    'LE COQ SPORTIF', 'LI-NING', 'LOTTO', 'LUXILON',
    'MOURATOGLOU', 'MSV', 'NIKE', 'NOUANSPORT',
    'POLYFIBRE', 'POLYSTAR', 'POP', 'PRINCE',
    'PRO KENNEX', 'PUMA', 'QUIZTENNIS', 'RACKET ROOTS',
    'REEF', 'ROLAND GARROS', 'RSL', 'SIDAS',
    'SODEX', 'SOLINCO', 'SORBOTHANE', 'TAAN',
    'TALBOT-TORRO', 'TENNIS POINT', 'TECNIFIBRE',
    'THUASNE', 'TINGERLAAT', 'TOALSON', 'TOURNA',
    'TREMBLAY CT', 'UNDER ARMOUR', 'VICTOR', 'WATTS',
    'WIMBLEDON', 'WEST GUT', 'WILSON', 'YONEX',
    'ZAMST'
  ];

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
            <option value="vetement">Vetement</option>
            <option value="volant">Volant</option>
            <option value="chaussure">Chaussure</option>
            <option value="accessoire">Accessoire</option>
            <option value="raquette">Raquette</option>
            <option value="bagagerie">Bagagerie</option>
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
          <textarea
            name="description"
            value={article.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
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
            max="100"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Quantité</label>
          <input
            type="number"
            name="quantite"
            value={article.quantite}
            onChange={handleInputChange}
            min="1"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Sélecteur de marque */}
        <div>
          <label className="block text-gray-700">Marque</label>
          <select
            name="marque"
            value={article.marque}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Sélectionner une marque</option>
            {categorieNom.toLowerCase() === 'raquette' && (
              <>
                {raquetteSpecificBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
            {categorieNom.toLowerCase() === 'vetement' && (
              <>
                {clothingBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
            {categorieNom.toLowerCase() === 'volant' && (
              <>
                {volantSpecificBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
            {categorieNom.toLowerCase() === 'chaussure' && (
              <>
                {shoeSpecificBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
            {categorieNom.toLowerCase() === 'bagagerie' && (
              <>
                {bagagerieSpecificBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
            {categorieNom.toLowerCase() === 'accessoire' && (
              <>
                {accessoriesSpecificBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Champ de taille pour les vêtements et bagagerie */}
        {(categorieNom.toLowerCase() === 'vetement' || categorieNom.toLowerCase() === 'bagagerie') && (
          <div>
            <label className="block text-gray-700">Taille (ex: S, M, L)</label>
            <input
              type="text"
              name="taille"
              value={article.taille.join(', ')}
              onChange={handleTailleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Champ de pointure pour les chaussures */}
        {categorieNom.toLowerCase() === 'chaussure' && (
          <div>
            <label className="block text-gray-700">Pointure</label>
            <input
              type="text"
              name="pointure"
              value={article.pointure.join(', ')} // Affichez les pointures en tant que chaîne séparée par des virgules
              onChange={handlePointureChange} // Utilisez la fonction dédiée pour gérer le changement
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Sélecteur de genre */}
        {(categorieNom.toLowerCase() === 'vetement' || categorieNom.toLowerCase() === 'chaussure') && (
          <div>
            <label className="block text-gray-700">Genre</label>
            <select
              name="genre"
              value={article.genre}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Sélectionner un genre</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="enfant">Enfant</option>
            </select>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Prix Total: {calculatePrixTotal()} €</h3>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Créer l&#39;Article
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
