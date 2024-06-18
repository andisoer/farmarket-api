import { createConnection } from 'mysql2/promise';
import config from '../services/config.js';

export async function query(sql, params, connection) {
  let conn = connection;
  let shouldCloseConnection = false;

  if (!conn) {
    conn = await createConnection(config.db);
    shouldCloseConnection = true;
  }

  const [results] = await conn.execute(sql, params);

  if (shouldCloseConnection) {
    await conn.end();
  }

  return results;
}

export default {
  query,
};
