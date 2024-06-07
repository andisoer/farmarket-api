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

export const readVegetable = async (offset, limit) => {
  const query = `SELECT id, name, image_url, price, unit, unit_total FROM vegetables LIMIT ${offset},${limit}`;
  return _query(query);
};

export default { insertVegetable, readVegetable };
