import { query as _query } from '../config/database.js';

export const insertVegetableBenefit = async (vegetableId, benefitId) => {
  const query = 'INSERT INTO vegetable_benefits (vegetable_id, benefit_id) VALUES (?, ?)';
  await _query(query, [vegetableId, benefitId]);
};

export const checkVegetableBenefitExists = async (vegetableId, benefitId) => {
  const query = 'SELECT 1 FROM vegetable_benefits WHERE vegetable_id = ? AND benefit_id = ?';
  const rows = await _query(query, [vegetableId, benefitId]);

  return rows.length > 0;
};

export default { insertVegetableBenefit, checkVegetableBenefitExists };
