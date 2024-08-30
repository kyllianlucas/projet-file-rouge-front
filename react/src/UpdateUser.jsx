import { useState } from "react";

const UpdateUserForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    rue: "",
    ville: "",
    codePostal: "",
    pays: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAtLeastOneFieldFilled = () => {
    return Object.values(formData).some((field) => field.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAtLeastOneFieldFilled()) {
      alert("Veuillez remplir au moins un champ avant de soumettre le formulaire.");
      return;
    }

    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajout de l'en-tête d'autorisation
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        alert("Utilisateur mis à jour avec succès !");
        console.log(updatedUser);
      } else {
        const errorData = await response.json();
        console.error("Détails de l'erreur :", errorData);
        alert(`Erreur lors de la mise à jour de l'utilisateur : ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      alert("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Mise à jour de l&#39;utilisateur</h2>
      <form onSubmit={handleSubmit}>
        {/* Champs de formulaire */}
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le nom"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le prénom"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez l'email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le téléphone"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le mot de passe"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rue" className="block text-sm font-medium text-gray-700">Rue</label>
          <input
            type="text"
            id="rue"
            name="rue"
            value={formData.rue}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez la rue"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ville" className="block text-sm font-medium text-gray-700">Ville</label>
          <input
            type="text"
            id="ville"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez la ville"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">Code Postal</label>
          <input
            type="text"
            id="codePostal"
            name="codePostal"
            value={formData.codePostal}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le code postal"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pays" className="block text-sm font-medium text-gray-700">Pays</label>
          <input
            type="text"
            id="pays"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Entrez le pays"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
