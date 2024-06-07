import { v4 as uuidv4 } from 'uuid';
import { getOffset, emptyOrRows, result } from '../services/helper.js';

import { insertVegetable, readVegetable } from '../models/vegetable_model.js';

const getAll = async (req, res) => {
  const { page } = req.query;
  const { limit } = req.query;

  const offset = getOffset(limit, page);

  const rows = await readVegetable(offset, limit);
  const data = emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return result(res, response, 401);
};

const addVegetable = async (request, res) => {
  try {
    const {
      name, price, unit, unitTotal, description,
    } = request.body;

    const imageUrl = request.file ? request.file.path : null;
    const id = uuidv4();

    if (!name || !imageUrl || !price || !unit || !unitTotal || !description) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 403);
    }

    const validUnits = ['gr', 'pcs', 'kg'];
    if (!validUnits.includes(unit)) {
      const response = {
        success: false,
        message: 'Unit must be one of gr, pcs, or kg',
      };
      return result(res, response, 401);
    }

    await insertVegetable(id, name, imageUrl, price, unit, unitTotal, description);

    const response = { success: true, message: 'Success add vegetable' };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Failed add vegetables' };
    return result(res, response, 500);
  }
};

export {
  getAll,
  addVegetable,
};
