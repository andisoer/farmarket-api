import { createConnection } from 'mysql2/promise';
import config from '../services/config.js';

export async function query(sql, params) {
  const connection = await createConnection(config.db);
  const [results] = await connection.execute(sql, params);

  return results;
}

export default {
  query,
};
