import helper from "../services/helper.js";

import { insertBenefit, readBenefit } from "../models/benefit_model.js";

import { v4 as uuidv4 } from "uuid";

export async function getAll(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  const offset = helper.getOffset(page, limit);

  const rows = await readBenefit(offset, limit);
  const data = helper.emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return helper.result(res, response, 200);
}

export async function addBenefit(request, res) {
  try {
    const { benefit } = request.body;

    const id = uuidv4();

    if (!benefit) {
      const response = {
        success: false,
        message: "Please fill all required fields",
      };
      return helper.result(res, response, 401);
    }

    await insertBenefit(id, benefit);

    const response = { success: true, message: "Success add benefit!" };

    return helper.result(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: "Failed add benefit" };
    return helper.result(res, response, 500);
  }
}

export default {
  getAll,
  addBenefit,
};
