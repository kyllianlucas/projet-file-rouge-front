import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from './ArticleService';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getArticleById(id).then(response => {
      setArticle(response.data);
    }).catch(error => {
      console.error('Error fetching article', error);
    });
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-800 mb-4">{article.content}</p>
      {article.image && (
        <img src={article.image} alt={article.title} className="w-full h-auto" />
      )}
    </div>
  );
};

export default ArticleDetail;
