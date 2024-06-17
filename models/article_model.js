import { query as _query } from '../config/database.js';

export const insertArticle = async (id, imageUrl, title, description) => {
  const query = 'INSERT INTO articles (id, title, image_url, description) VALUES (?, ?, ?, ?)';
  await _query(query, [id, title, imageUrl, description]);
};

export const readArticle = async (offset = 1, limit = 10) => {
  const query = `SELECT id, title, description, image_url, created_at FROM articles LIMIT ${offset},${limit}`;
  return _query(query);
};

export const removeArticle = async (id) => {
  const query = 'DELETE FROM articles WHERE id=?';
  await _query(query, [id]);
};

export default { insertArticle, readArticle, removeArticle };
