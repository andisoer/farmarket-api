import { query as _query } from '../config/database.js';

export const insertArticle = async (id, title, description) => {
  const query = 'INSERT INTO articles (id, title, description) VALUES (?, ?, ?)';
  await _query(query, [id, title, description]);
};

export const readArticle = async (offset, limit) => {
  const query = `SELECT id, title, description, image_url, created_at FROM articles LIMIT ${offset},${limit}`;
  return _query(query);
};

export const removeArticle = async (id) => {
  const query = 'DELETE FROM articles WHERE id=?';
  await _query(query, [id]);
};

export default { insertArticle, readArticle, removeArticle };
