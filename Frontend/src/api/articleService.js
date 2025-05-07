import axiosInstance from './axiosInstance';

export const getArticlesAPI = async ({ page = 1, limit = 6, category = '', searchTerm = '' } = {}) => {
  let query = `/articles?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`;
  if (category) {
    query += `&category_like=${category}`; // Use _like for partial match if categories can be complex
  }
  if (searchTerm) {
    query += `&q=${searchTerm}`; // json-server uses 'q' for full-text search
  }
  const response = await axiosInstance.get(query);
  const totalCount = response.headers['x-total-count']; // json-server provides total count in headers
  return { articles: response.data, totalCount: parseInt(totalCount, 10) };
};

export const getArticleBySlugAPI = async (slug) => {
  const { data } = await axiosInstance.get(`/articles?slug=${slug}`);
  if (data.length > 0) {
    return data[0];
  }
  throw new Error('Articolo non trovato');
};

export const createArticleAPI = async (articleData) => {
  const { data } = await axiosInstance.post('/articles', articleData);
  return data;
};

export const updateArticleAPI = async (articleId, articleData) => {
  const { data } = await axiosInstance.patch(`/articles/${articleId}`, articleData);
  return data;
};

export const deleteArticleAPI = async (articleId) => {
  await axiosInstance.delete(`/articles/${articleId}`);
  return articleId;
};