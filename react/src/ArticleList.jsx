import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles } from './ArticleService';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((response) => {
      setArticles(response.data);
    }).catch(error => {
      console.error('Error fetching articles', error);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <ul className="space-y-4">
        {articles.map(article => (
          <li key={article.id} className="border-b border-gray-200 pb-2">
            <Link to={`/articles/${article.id}`} className="text-blue-600 hover:underline">
              {article.title}
            </Link>
            <p className="text-gray-600">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
