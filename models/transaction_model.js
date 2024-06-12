import { query as _query } from '../config/database.js';

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

export { createTransaction, createTransactionItem };
