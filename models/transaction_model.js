import { query as _query } from '../config/database.js';

const readTransaction = async (offset = 1, limit = 10) => {
  const query = `SELECT id, total_amount, created_at FROM transactions LIMIT ${offset},${limit}`;
  return _query(query);
};

const createTransaction = async (transactionId, totalAmount) => {
  const query = 'INSERT INTO transactions (id, total_amount) VALUES (?, ?)';
  return _query(query, [transactionId, totalAmount]);
};

const createTransactionItem = async (transactionId, vegetableId, quantity, price, amount) => {
  const query = `
        INSERT INTO transaction_items (transaction_id, vegetable_id, quantity, price, amount) 
        VALUES (?, ?, ?, ?, ?)
    `;
  await _query(query, [transactionId, vegetableId, quantity, price, amount]);
};

async function getTransactionById(transactionId) {
  const sql = `
        SELECT t.id, t.user_id, t.total_amount, t.created_at
        FROM transactions t
        WHERE t.id = ?
    `;
  return _query(sql, [transactionId]);
}
async function getTransactionItemsByTransactionId(transactionId) {
  const sql = `
        SELECT ti.transaction_id, ti.vegetable_id, ti.quantity, ti.price, v.name, v.description, v.image_url
        FROM transaction_items ti
        JOIN vegetables v ON ti.vegetable_id = v.id
        WHERE ti.transaction_id = ?
    `;
  return _query(sql, [transactionId]);
}

export {
  createTransaction,
  createTransactionItem,
  getTransactionById,
  getTransactionItemsByTransactionId,
  readTransaction,
};
