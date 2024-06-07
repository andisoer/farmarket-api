import { v4 as uuidv4 } from 'uuid';
import { getOffset, emptyOrRows, result } from '../services/helper.js';

import { insertVegetable, readVegetable, readVegetableById } from '../models/vegetable_model.js';

const getAll = async (req, res) => {
  const { page } = req.query;
  const { limit } = req.query;

  const offset = getOffset(limit, page);

  const rows = await readVegetable(offset, limit);
  const data = emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return result(res, response, 200);
};

const getById = async (req, res) => {
  const id = req.params.vegetableId;

  const data = await readVegetableById(id);

  if (data.length === 0) {
    const response = {
      success: false,
      message: 'Vegetable not found',
    };
    return result(res, response, 404);
  }

  const vegetable = {
    id: data[0].id,
    name: data[0].name,
    price: data[0].price,
    unit: data[0].unit,
    unit_total: data[0].unit_total,
    image_url: data[0].image_url,
    description: data[0].description,
    benefits: data.filter((row) => row.benefit_id).map((row) => ({
      id: row.benefit_id,
      name: row.benefit_name,
    })),
  };

  const response = { success: true, data: vegetable };

  return result(res, response, 200);
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
      return result(res, response, 401);
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
  getById,
  addVegetable,
};
