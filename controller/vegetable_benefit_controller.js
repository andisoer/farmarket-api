import { getOffset, emptyOrRows, result } from '../services/helper.js';
import { insertVegetableBenefit, checkVegetableBenefitExists } from '../models/vegetable_benefit_model.js';
import { checkVegetableExists, readVegetable } from '../models/vegetable_model.js';
import { checkBenefitExists } from '../models/benefit_model.js';

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

const addVegetableBenefit = async (request, res) => {
  try {
    const {
      vegetableId, benefitId,
    } = request.body;

    if (!vegetableId || !benefitId) {
      const response = {
        success: false,
        message: 'Please fill all required fields',
      };
      return result(res, response, 401);
    }

    const vegetableExists = await checkVegetableExists(vegetableId);
    if (!vegetableExists) {
      const response = {
        success: false,
        message: 'Invalid vegetable',
      };
      return result(res, response, 401);
    }

    const benefitExists = await checkBenefitExists(benefitId);
    if (!benefitExists) {
      const response = {
        success: false,
        message: 'Invalid benefit',
      };
      return result(res, response, 401);
    }

    const vegetableBenefitExists = await checkVegetableBenefitExists(vegetableId, benefitId);
    if (vegetableBenefitExists) {
      const response = {
        success: false,
        message: 'Benefit for this vegetable already added!',
      };
      return result(res, response, 401);
    }

    await insertVegetableBenefit(vegetableId, benefitId);

    const response = { success: true, message: 'Success add vegetable benefit' };

    return result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: 'Failed add vegetable benefit' };
    return result(res, response, 500);
  }
};

export { getAll, addVegetableBenefit };
