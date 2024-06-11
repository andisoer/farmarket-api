import { query as _query } from '../config/database.js';

export const insertVegetable = async (
  id,
  name,
  price,
  unit,
  unitTotal,
  description,
) => {
  const query = 'INSERT INTO vegetables (id, name, price, unit, unit_total, description) VALUES (?, ?, ?, ?, ?, ?)';
  await _query(query, [id, name, price, unit, unitTotal, description]);
};

export const readVegetable = async (offset, limit) => {
  const query = `SELECT id, name, price, unit, unit_total FROM vegetables LIMIT ${offset},${limit}`;
  return _query(query);
};

export default { insertVegetable, readVegetable };
