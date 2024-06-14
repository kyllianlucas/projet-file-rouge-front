const BASE_URL = 'http://localhost:8080/api'; // Assurez-vous que l'URL correspond à votre back-end

async function fetchUserByEmail(email) {
  const response = await fetch(`${BASE_URL}/users?email=${email}`);
  if (!response.ok) {
    throw new Error('Utilisateur non trouvé');
  }
  return response.json();
}

async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Connexion échouée');
  }
  return response.json();
}

export { fetchUserByEmail, loginUser };
