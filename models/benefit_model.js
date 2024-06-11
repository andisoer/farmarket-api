import { query as _query } from '../config/database.js';

export const insertBenefit = async (id, name) => {
  const query = 'INSERT INTO benefits (id, benefit) VALUES (?, ?)';
  await _query(query, [id, name]);
};

export const readBenefit = async (offset, limit) => {
  const query = `SELECT id, benefit FROM benefits LIMIT ${offset},${limit}`;
  return _query(query);
};

export default { insertBenefit, readBenefit };
