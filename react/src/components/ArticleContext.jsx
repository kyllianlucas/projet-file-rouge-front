import React, { createContext, useState } from 'react';

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  return (
    <ArticleContext.Provider value={{ selectedArticleId, setSelectedArticleId }}>
      {children}
    </ArticleContext.Provider>
  );
};
