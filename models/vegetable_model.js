import { query as _query } from '../config/database.js';

export const insertVegetable = async (
  id,
  name,
  imageUrl,
  price,
  unit,
  unitTotal,
  description,
) => {
  const query = 'INSERT INTO vegetables (id, name, image_url, price, unit, unit_total, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await _query(query, [id, name, imageUrl, price, unit, unitTotal, description]);
};

export const readVegetable = async (offset = 1, limit = 10) => {
  const query = `SELECT id, name, image_url, price, unit, unit_total FROM vegetables LIMIT ${offset},${limit}`;
  return _query(query);
};

export const readVegetableById = async (id) => {
  const query = `SELECT id, name, description, image_url, price, unit, unit_total FROM vegetables WHERE id = "${id}"`;
  return _query(query);
};

export const checkVegetableExists = async (id) => {
  const query = 'SELECT 1 FROM vegetables WHERE id = ?';
  const rows = await _query(query, [id]);
  return rows.length > 0;
};

export default {
  insertVegetable, readVegetable, readVegetableById, checkVegetableExists,
};
