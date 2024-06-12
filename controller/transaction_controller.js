/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { v4 as uuidv4 } from 'uuid';

import { createTransaction, createTransactionItem } from '../models/transaction_model.js';
import { readVegetableById } from '../models/vegetable_model.js';
import { result } from '../services/helper.js';

export const createVegetableTransaction = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    const response = {
      success: false,
      message: 'Please fill all required fields',
    };
    return result(res, response, 401);
  }

  let totalAmount = 0;

  try {
    // Calculate total amount
    for (const item of items) {
      const { vegetableId, quantity } = item;
      if (!vegetableId || !quantity || quantity <= 0) {
        throw new Error('Invalid item data');
      }

      const vegetable = await readVegetableById(vegetableId);
      if (!vegetable) {
        throw new Error(`Vegetable with ID ${vegetableId} not found`);
      }
      totalAmount += vegetable[0].price * quantity;
    }

    // Create transaction
    const id = uuidv4();

    await createTransaction(id, totalAmount);

    // Create transaction items
    for (const item of items) {
      const { vegetableId, quantity } = item;
      const vegetable = await readVegetableById(vegetableId);

      const amount = vegetable[0].price * quantity;

      // eslint-disable-next-line max-len
      await createTransactionItem(id, vegetableId, quantity, vegetable[0].price, amount);
    }

    const response = {
      success: true,
      message: 'Success create transaction',
    };
    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error.message}`);
    const response = {
      success: false,
      message: `${error.message}`,
    };
    return result(res, response, 500);
  }
};

export default { createVegetableTransaction };
