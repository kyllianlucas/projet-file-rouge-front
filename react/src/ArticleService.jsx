import axios from 'axios';

const API_URL = '/api/articles';

export const getAllArticles = () => {
  return axios.get(API_URL);
};

export const getArticleById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const getArticlesBySousCategorie = (sousCategorieId) => {
  return axios.get(`${API_URL}/bySousCategorie/${sousCategorieId}`);
};

export const createArticle = (articleDTO, categoryId, image) => {
  const formData = new FormData();
  formData.append('article', JSON.stringify(articleDTO));
  formData.append('categoryId', categoryId);
  if (image) {
    formData.append('image', image);
  }

  return axios.post(`${API_URL}/creerArticle`, formData);
};

export const updateArticle = (id, articleDTO, categoryId, image) => {
  const formData = new FormData();
  formData.append('article', JSON.stringify(articleDTO));
  if (categoryId) {
    formData.append('categoryId', categoryId);
  }
  if (image) {
    formData.append('image', image);
  }

  return axios.put(`${API_URL}/majArticle/${id}`, formData);
};

export const deleteArticle = (id) => {
  return axios.delete(`${API_URL}/supprimerArticle/${id}`);
};
