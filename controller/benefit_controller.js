const db = require("../config/database.js");
const helper = require("../services/helper");
const config = require("../services/config");

const { insertBenefit, readBenefit } = require("../models/benefit_model");

const { v4: uuidv4 } = require("uuid");

async function getAll(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  const offset = helper.getOffset(page, limit);

  const rows = await readBenefit(offset, limit);
  const data = helper.emptyOrRows(rows);

  const meta = { page };

  const response = { success: true, data, meta };

  return helper.response(res, response, 200);
}

async function addBenefit(request, res) {
  try {
    const { benefit } = request.body;

    const id = uuidv4();

    if (!benefit) {
      const response = {
        success: false,
        message: "Please fill all required fields",
      };
      return helper.response(res, response, 401);
    }

    await insertBenefit(id, benefit);

    const response = { success: true, message: "Success add benefit!" };

    return helper.response(res, response, 201);
  } catch (error) {
    console.log(`error ${error}`);

    const response = { success: false, message: "Failed add benefit" };
    return helper.response(res, response, 500);
  }
}

module.exports = {
  getAll,
  addBenefit,
};
