import { v4 as uuidv4 } from 'uuid';
import { getOffset, emptyOrRows, result } from '../services/helper.js';

import { insertBenefit, readBenefit } from '../models/benefit_model.js';

export async function getAll(req, res) {
  const { page } = req.query;
  const { limit } = req.query;

  const offset = getOffset(limit, page);

  const rows = await readBenefit(offset, limit);
  const data = emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return result(res, response, 200);
}

export async function addBenefit(request, res) {
  try {
    const { benefit } = request.body;

    const id = uuidv4();

    if (!benefit) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 401);
    }

    await insertBenefit(id, benefit);

    const response = { success: true, message: 'Success add benefit!' };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Failed add benefit' };
    return result(res, response, 500);
  }
}

export default {
  getAll,
  addBenefit,
};
