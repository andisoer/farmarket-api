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
  const query = `SELECT v.*, b.id as benefit_id, b.benefit as benefit_name
        FROM vegetables v
        LEFT JOIN vegetable_benefits vb ON v.id = vb.vegetable_id
        LEFT JOIN benefits b ON vb.benefit_id = b.id
        WHERE v.id = "${id}"`;
  return _query(query);
};

export const checkVegetableExists = async (id) => {
  const query = 'SELECT 1 FROM vegetables WHERE id = ?';
  const rows = await _query(query, [id]);
  return rows.length > 0;
};

export const readVegetablesByBenefitIds = async (benefitIds) => {
  const placeholders = benefitIds.map(() => '?').join(',');
  const query = `
      SELECT v.id, v.name, v.price, v.unit, v.unit_total, v.image_url, v.description, 
               GROUP_CONCAT(DISTINCT b.id) as benefit_ids, 
               GROUP_CONCAT(DISTINCT b.benefit) as benefit_names
        FROM vegetables v
        JOIN vegetable_benefits vb ON v.id = vb.vegetable_id
        JOIN benefits b ON vb.benefit_id = b.id
        WHERE b.id IN (${placeholders})
        GROUP BY v.id, v.name, v.price, v.unit, v.unit_total, v.image_url, v.description
        HAVING COUNT(DISTINCT b.id) = ?
  `;

  return _query(query, [...benefitIds, benefitIds.length]);
};

export default {
  insertVegetable,
  readVegetable,
  readVegetableById,
  checkVegetableExists,
  readVegetablesByBenefitIds,
};
