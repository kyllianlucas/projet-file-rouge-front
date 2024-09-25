/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',         // Couleur principale (Bleu)
        secondary: '#6C757D',       // Couleur secondaire (Gris)
        background: '#F8F9FA',      // Couleur de fond (Gris très clair)
        text: '#343A40',            // Couleur du texte (Gris foncé)
        link: '#007BFF',            // Couleur de lien (Bleu)
        error: '#DC3545',           // Couleur d'erreur (Rouge)
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],   // Police principale
        secondary: ['Open Sans', 'sans-serif'], // Police secondaire
      },
      spacing: {
        '1.5': '1.5rem',         // Espacement pour les titres principaux
        '1': '1rem',             // Espacement pour les sous-titres
        '0.75': '0.75rem',       // Espacement des boutons
        '0.5': '0.5rem',         // Espacement des champs de formulaire
      },
      borderRadius: {
        light: '0.25rem',        // Arrondi léger pour les boutons et champs
      },
    },
  },
  plugins: [],
}
